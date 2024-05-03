export const convert_size = (size_bytes) => {
    // Function to convert bytes to appropriate units (GB, MB, KB, bytes)
    size_bytes = parseInt(size_bytes); // Ensure size_bytes is treated as an integer

    if (size_bytes >= 1024 * 1024 * 1024 * 1024) {
        return (size_bytes / (1024 * 1024 * 1024 * 1024)).toFixed(2) + " TB";
    }
    if (size_bytes >= 1024 * 1024 * 1024) {
        return (size_bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
    } else if (size_bytes >= 1024 * 1024) {
        return (size_bytes / (1024 * 1024)).toFixed(2) + " MB";
    } else if (size_bytes >= 1024) {
        return (size_bytes / 1024).toFixed(2) + " KB";
    } else {
        return size_bytes.toFixed(2) + " bytes";
    }
};

export const calculation_percent = (size, free) => {
    let used = size - free;
    let usedPercentage = (used / size) * 100;
    return usedPercentage.toFixed(2);
};
