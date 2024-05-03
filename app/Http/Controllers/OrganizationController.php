<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrganizationRequest;
use App\Http\Resources\DeviceCollection;
use App\Http\Resources\OrganizationCollection;
use App\Models\Contacts;
use App\Models\Devices;
use App\Models\Organizations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    public function index()
    {
        return Inertia::render('Organization/Index', [
            'organizations' => new OrganizationCollection(Organizations::query()
                ->filter(FacadesRequest::only('search'))
                ->paginate(24))
        ]);
    }

    public function create()
    {
        return Inertia::render('Organization/Create');
    }

    public function store(OrganizationRequest $request)
    {
        try {
            DB::beginTransaction();

            $validation = $request->validated();
            $org = Organizations::create($validation);

            if ($validation['logo'] != null) {
                $flename = strtolower(str_replace(' ', '-', $validation['name'])) . '.' . $validation['logo']->extension();

                Storage::putFileAs("organizations/logo/", $validation['logo'], $flename);

                $org->update([
                    'logo' => 'storage/organizations/logo/' . $flename
                ]);
            }

            DB::commit();

            return Redirect::route('organization.show', [$org])->with('message', 'Organization created!');
        } catch (\Exception $error) {
            Log::error('Creating organization failed', ['exception' => $error]);

            DB::rollBack();

            return back();
        }
    }

    public function show(Organizations $organization)
    {
        return Inertia::render('Organization/Show', [
            'organization' => $organization,
            'devices' => new DeviceCollection(Devices::where('organization_ids', $organization->id)->get())
            // 'devices' => Devices::where('organization_ids', $organization->id)->get()
        ]);
    }

    public function edit(Organizations $organization)
    {
        return Inertia::render('Organization/Edit', [
            'organization' => $organization
        ]);
    }

    public function update(Organizations $organization, Request $request)
    {
        try {
            DB::beginTransaction();

            $organization->update($request->all());

            if ($request->logo != null) {
                $flename = strtolower(str_replace(' ', '-', $request->name)) . '.' . $request->logo->extension();

                Storage::putFileAs("organizations/logo/", $request->logo, $flename);

                $organization->update([
                    'logo' => 'storage/organizations/logo/' . $flename
                ]);
            }
            DB::commit();

            return Redirect::route('organization.show', [$organization])->with('message', 'Organization updated!');
        } catch (\Exception $error) {
            Log::error('Updating organizaton failed', ['exception' => $error]);

            DB::rollBack();

            return back();
        }
    }

    public function destroy(Organizations $organization)
    {
        try {
            DB::beginTransaction();
            $organization->delete();
            DB::commit();

            return Redirect::route('organization.index')->with('message', 'Organization removed!');
        } catch (\Exception $error) {
            Log::error('Deleting organization failed', ['exception' => $error]);

            DB::rollBack();

            return back();
        }
    }

    public function getAllCotact(Organizations $organization)
    {
        return response()->json([
            'contacts' => Contacts::where('organization_ids', $organization->id)->get()
        ]);
    }

    public function storeContact(Request $request)
    {
        try {
            DB::beginTransaction();
            Contacts::create($request->all());
            DB::commit();

            return response()->json(['message' => 'Contact created!']);
        } catch (\Exception $error) {
            Log::error('Creating contact failed', ['exception' => $error]);

            DB::rollBack();

            return response()->json(['message' => 'Creating contact failed'], $error->getCode());
        }
    }

    public function editContact(Organizations $organization, Contacts $contact)
    {
        return response()->json([
            'contact' => $contact
        ]);
    }

    public function updateContact(Organizations $organization, Contacts $contact, Request $request)
    {
        try {
            DB::beginTransaction();
            $contact->update($request->all());
            DB::commit();

            return response()->json([
                'message' => 'Contact updated!'
            ]);
        } catch (\Exception $error) {
            Log::error('Updating contact failed', ['exception' => $error]);

            DB::rollBack();

            return response()->json(['message' => 'Updating contact failed'], $error->getCode());
        }
    }

    public function deleteContact(Contacts $contact)
    {
        try {
            DB::beginTransaction();
            $contact->delete();
            DB::commit();

            return response()->json(['message' => 'Contact removed!']);
        } catch (\Exception $error) {
            Log::error('Deleting contact failed', ['exception' => $error]);

            DB::rollBack();

            return response()->json(['message' => 'Deleting contact failed'], $error->getCode());
        }
    }
}
