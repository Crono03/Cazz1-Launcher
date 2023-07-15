// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use surrealdb::{sql::Thing, Surreal, engine::remote::ws::Ws};

#[derive(Debug, thiserror::Error)]
enum Error {
    #[error("Database error: {0}")]
    LocalDB(#[from] surrealdb::error::Db),
    #[error("Database error: {0}")]
    RemoteDB(#[from] surrealdb::error::Api),
    #[error("Database error: {0}")]
    Surreal(#[from] surrealdb::Error),
    #[error("{0}")]
    UtenteNonEsiste(String)
}


#[derive(Debug, serde::Deserialize)]
struct Record {
    #[allow(dead_code)]
    id: Thing,
}



#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct Utente {
    email: String,
    password: String,
}

// we must manually implement serde::Serialize
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
async fn database() -> Result<(), Error>{
    let db = Surreal::new::<Ws>("127.0.0.1:8000").await?;
    db.signin(surrealdb::opt::auth::Root {
        username: "root",
        password: "pic1",
    })
    .await?;
    db.use_ns("test").use_db("test").await?;

    let _iggoroi: Record = db.create(("users", "Iggoroi")).content(Utente {
        email: "iggoroi.g@gmail.com".to_string(),
        password: "R4m4tec4".to_string(),
    }).await?;
    Ok(())
}


#[tauri::command]
async fn login(username: &str, password: &str) -> Result<Utente, Error>{
    let db = Surreal::new::<Ws>("127.0.0.1:8000").await?;
    db.signin(surrealdb::opt::auth::Root {
        username: "root",
        password: "pic1",
    })
    .await?;
    db.use_ns("test").use_db("test").await?;
    
    let mut utente = db.query(format!("SELECT * FROM users WHERE id=\"users:{username}\" and password=\"{password}\"")).await?;
    let esiste: Option<Utente> = utente.take(0)?;
    match esiste {
        Some(user) => Ok(user),
        None => Err(Error::UtenteNonEsiste("Nome utente o password sbagliati".to_string()))
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![database, login])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
