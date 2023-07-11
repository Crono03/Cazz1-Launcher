use sys_locale::get_locale;
use super::writePrefs;


pub fn get_localization() {
    let locale = get_locale().unwrap_or_else(|| String::from("en-US"));
    let first_two_chars: String = locale.chars().take(2).collect();

    writePrefs::write_prefs(&first_two_chars);

}