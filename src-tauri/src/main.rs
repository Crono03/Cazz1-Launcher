// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use fancy_regex::Regex;
use surrealdb::{engine::remote::ws::Ws, sql::Thing, Surreal};

#[derive(Debug, thiserror::Error)]
enum Error {
    #[error("Database s:e:db error: {0}")]
    LocalDB(#[from] surrealdb::error::Db),
    #[error("Database s:e:api error: {0}")]
    RemoteDB(#[from] surrealdb::error::Api),
    #[error("Database s:E error: {0}")]
    Surreal(#[from] surrealdb::Error),
    #[error("{0}")]
    UtenteNonEsiste(String),
    #[error("{0}")]
    PasswordNotEquals(String),
    #[error("{0}")]
    InvalidEmail(String),
    #[error("{0}")]
    InvalidUsername(String),
    #[error("{0}")]
    InvalidPasswordLenght(String),
    #[error("{0}")]
    InvalidPassword(String),
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
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
async fn signup(
    username: &str,
    email: &str,
    password: &str,
    confirm_password: &str,
) -> Result<Record, Error> {
    if password != confirm_password {
        return Err(Error::PasswordNotEquals("notSamePassword".to_string()));
    }
    let password_regex = Regex::new(r#"^((?!.*[\s"';])(?=.*[A-Z])(?=.*\d).{8,255})$"#).unwrap();
    if password.len() < 8 {
        return Err(Error::InvalidPasswordLenght("tooShortPassword".to_string()));
    }
    if password.len() > 255 {
        return Err(Error::InvalidPasswordLenght("tooLognPassword".to_string()));
    }
    if !password_regex.is_match(password).unwrap() {
        return Err(Error::InvalidPassword("invalidPassword".to_string()));
    }
    let email_regex = Regex::new(
        r"^([a-z0-9_+]([a-z0-9_+.]*[a-z0-9_+])?)@([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6})",
    )
    .unwrap();
    if !email_regex.is_match(email).unwrap() {
        return Err(Error::InvalidEmail("invalidEmail".to_string()));
    }
    let username_regex = Regex::new(r"^[a-zA-Z0-9]{3,10}$").unwrap();
    if !username_regex.is_match(username).unwrap() {
        return Err(Error::InvalidUsername("invalidUsername".to_string()));
    }
    let db = Surreal::new::<Ws>("127.0.0.1:8000").await?;
    db.signin(surrealdb::opt::auth::Root {
        username: "root",
        password: "pic1",
    })
    .await?;
    db.use_ns("test").use_db("test").await?;

    let result: Result<_, surrealdb::Error> = db
        .create(("users", username))
        .content(User {
            email: email.to_string(),
            password: password.to_string(),
        })
        .await;
    let exist = format!(
        "There was a problem with the database: Database record `users:{username}` already exists"
    );
    match result {
        Ok(record) => Ok(record),
        Err(surrealdb::Error::Api(surrealdb::error::Api::Query(ref err)))
            if String::from(err) == exist =>
        {
            Err(Error::InvalidUsername("usernameDuplicate".to_string()))
        }
        Err(surrealdb::Error::Api(err)) => Err(Error::Surreal(surrealdb::Error::Api(err))),
        Err(surrealdb::Error::Db(err)) => Err(Error::Surreal(surrealdb::Error::Db(err))),
    }
}

#[tauri::command]
async fn login(username: &str, password: &str) -> Result<User, Error> {
    let db = Surreal::new::<Ws>("127.0.0.1:8000").await?;
    db.signin(surrealdb::opt::auth::Root {
        username: "root",
        password: "pic1",
    })
    .await?;
    db.use_ns("test").use_db("test").await?;

    let mut utente = db
        .query(format!(
            "SELECT * FROM users WHERE id=\"users:{username}\" and password=\"{password}\""
        ))
        .await?;
    let esiste: Option<User> = utente.take(0)?;
    match esiste {
        Some(user) => Ok(user),
        None => Err(Error::UtenteNonEsiste(
            "Nome utente o password sbagliati".to_string(),
        )),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![signup, login])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
