use std::env;
use std::fs::File;
use std::io::prelude::*;
use serde_json::json;

pub fn check_osPath(os: &str) {
    match os {
        "Windows" => {
            println!("Stai utilizzando il sistema operativo Windows.");
            // Aggiungi qui la logica specifica per Windows
        }
        "Linux" => {
            println!("Stai utilizzando il sistema operativo Linux.");
            // Aggiungi qui la logica specifica per Linux
        }
        "MacOS" => {
            println!("Stai utilizzando il sistema operativo macOS.");
            // Aggiungi qui la logica specifica per macOS
        }
        _ => {
            println!("Sistema operativo non riconosciuto.");
            // Aggiungi qui la logica per gli altri casi non specificati
        }
    }
}


pub fn write_prefs(first_two_chars: &str) {
    let appdata_path = match env::var("APPDATA") {
        Ok(path) => path,
        Err(_) => {
            println!("Impossibile ottenere la cartella APPDATA.");
            return;
        }
    };

    let prefs_dir = format!("{}\\cazz1-launcher", appdata_path);
    if let Err(err) = std::fs::create_dir_all(&prefs_dir) {
        println!("Errore nella creazione della cartella delle preferenze: {}", err);
        return;
    }

    let file_path = format!("{}\\prefs.json", prefs_dir);
    let json_data = json!({
        "first_two_chars": first_two_chars
    });

    let json_string = serde_json::to_string(&json_data).expect("Errore durante la serializzazione JSON.");

    if let Err(err) = File::create(&file_path).and_then(|mut file| file.write_all(json_string.as_bytes())) {
        println!("Errore nella creazione del file delle preferenze: {}", err);
        return;
    }

    println!("File delle preferenze creato con successo.");
}