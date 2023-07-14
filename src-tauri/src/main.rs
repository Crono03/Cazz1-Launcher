// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rusqlite::{params, Connection, Result};

#[derive(Debug, thiserror::Error)]
enum Error {
    #[error("Database error: {0}")]
    Conn(#[from] rusqlite::Error)
}

// we must also implement serde::Serialize
impl serde::Serialize for Error {
  fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
  where
    S: serde::ser::Serializer,
  {
    serializer.serialize_str(self.to_string().as_ref())
  }
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn database() -> Result<(), Error>{
    let _db = Connection::open("./database/test.db3")?;
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![database])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
