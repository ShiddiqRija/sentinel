<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Models\Contacts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function create()
    {
        return Inertia::render('Organization/Contact/Create');
    }

    public function store(ContactRequest $request)
    {
        try {
            $validation = $request->validated();

            DB::beginTransaction();
            $contact = Contacts::create($validation);
            DB::commit();

            return Redirect::route('organization.show', [$contact->customer_ids])->with('message', 'Organization created!');
        } catch (\Exception $error) {
            Log::error('Creating contact failed', ['exception' => $error]);

            DB::rollBack();

            return back();
        }
    }

    public function edit(Contacts $contact)
    {
        return Inertia::render('Organization/Contact/Edit', [
            'contact' => $contact
        ]);
    }

    public function update(Contacts $contact, Request $request)
    {
        try {
            DB::beginTransaction();
            $contact->update($request->all());
            DB::commit();

            return Redirect::route('organization.show', [$contact->customer_ids])->with('message', 'Organization created!');
        } catch (\Exception $error) {
            Log::error('Updating contact failed', ['exception' => $error]);

            DB::rollBack();

            return back();
        }
    }

    public function destoy(Contacts $contact)
    {
        try {
            DB::beginTransaction();
            $org_id = $contact->customer_ids;
            $contact->delete();
            DB::commit();

            return Redirect::route('organization.show', [$org_id])->with('message', 'Organization removed!');
        } catch (\Exception $error) {
            Log::error('Delete organization failed', ['exception' => $error]);

            DB::rollBack();

            return back();
        }
    }
}
