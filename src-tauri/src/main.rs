// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


use surrealdb::{sql::Thing, Surreal, engine::remote::ws::Ws};
use fancy_regex::Regex;

#[derive(Debug, thiserror::Error)]
enum Error {
    #[error("Database error: {0}")]
    LocalDB(#[from] surrealdb::error::Db),
    #[error("Database error: {0}")]
    RemoteDB(#[from] surrealdb::error::Api),
    #[error("Database error: {0}")]
    Surreal(#[from] surrealdb::Error),
    #[error("{0}")]
    UtenteNonEsiste(String),
    #[error("{0}")]
    PasswordNotEquals(String),
    #[error("{0}")]
    InvalidEmail(String),
    #[error("{0}")]
    InvalidUsername(String),
    #[error("psoelllo1")]
    InvalidPasswordLenght(String),
    #[error("invalidPassword")]
    InvalidPassword(String)
}


#[derive(Debug, serde::Deserialize)]
struct Record {
    #[allow(dead_code)]
    id: Thing,
}



#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct User {
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
async fn signup(username: &str, email: &str, password: &str, confirm_password: &str) -> Result<(), Error>{
    if password != confirm_password {
        return Err(Error::PasswordNotEquals("Passwords are not equals".to_string()))
    }
    let password_regex = Regex::new(r#"^((?!.*[\s"'])(?=.*[A-Z])(?=.*\d).{7,255})$"#).unwrap();
    if password.len() <=8 {
        return Err(Error::InvalidPasswordLenght("Password too short, make it at least 8 characters".to_string()));
    }
    if password.len() >= 255 {
        return Err(Error::InvalidPasswordLenght("Password too long, passwords can't exceed 255 characters'".to_string()));
    }
    if !password_regex.is_match(password).unwrap() {
        return Err(Error::InvalidPassword("Invalid password for security reasons".to_string()));
    }
    let email_regex = Regex::new(r"^([a-z0-9_+]([a-z0-9_+.]*[a-z0-9_+])?)@([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6})").unwrap();
    if !email_regex.is_match(email).unwrap() {
        return Err(Error::InvalidEmail("Invalid email address".to_string()));
    }
    let username_regex = Regex::new(r"^[a-zA-Z0-9]{3,10}$").unwrap();
    if !username_regex.is_match(username).unwrap(){
        return Err(Error::InvalidUsername("Invalid username".to_string()))
    }
    let db = Surreal::new::<Ws>("127.0.0.1:8000").await?;
    db.signin(surrealdb::opt::auth::Root {
        username: "root",
        password: "pic1",
    })
    .await?;
    db.use_ns("test").use_db("test").await?;

    let result: Record = db.create(("users", username)).content(User {
        email: email.to_string(),
        password: password.to_string()
    })
    .await?;

    Ok(())
}


#[tauri::command]
async fn login(username: &str, password: &str) -> Result<User, Error>{
    let db = Surreal::new::<Ws>("127.0.0.1:8000").await?;
    db.signin(surrealdb::opt::auth::Root {
        username: "root",
        password: "pic1",
    })
    .await?;
    db.use_ns("test").use_db("test").await?;
    
    let mut utente = db.query(format!("SELECT * FROM users WHERE id=\"users:{username}\" and password=\"{password}\"")).await?;
    let esiste: Option<User> = utente.take(0)?;
    match esiste {
        Some(user) => Ok(user),
        None => Err(Error::UtenteNonEsiste("Nome utente o password sbagliati".to_string()))
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![signup, login])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
