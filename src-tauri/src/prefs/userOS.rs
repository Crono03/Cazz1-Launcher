use super::writePrefs;



#[cfg(target_os = "linux")]
fn get_os() -> &'static str {
    "Linux"
}

#[cfg(target_os = "macos")]
fn get_os() -> &'static str {
    "macOS"
}

#[cfg(target_os = "windows")]
fn get_os() -> &'static str {
    "Windows"
}

pub fn user_os() {
    let os = get_os();
    writePrefs::check_osPath(&os);
    
}
