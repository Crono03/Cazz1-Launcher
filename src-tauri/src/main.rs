// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use fancy_regex::Regex;
use surrealdb::{
    engine::remote::ws::{self, Ws},
    sql::Thing,
    Surreal,
};

#[derive(Debug, thiserror::Error)]
enum Error {
    #[error("Database s:e:db error: {0}")]
    LocalDB(#[from] surrealdb::error::Db),
    #[error("Database s:e:api error: {0}")]
    RemoteDB(#[from] surrealdb::error::Api),
    #[error("Database s:E error: {0}")]
    Surreal(#[from] surrealdb::Error),
    #[error("userNotExists")]
    UserNotExists,
    #[error("notSamePassword")]
    PasswordNotEquals,
    #[error("invalidEmail")]
    InvalidEmail,
    #[error("{0}")]
    InvalidUsername(String),
    #[error("{0}")]
    InvalidPasswordLenght(String),
    #[error("invalidPassword")]
    InvalidPassword,
    #[error("{0}")]
    Connection(String),
    #[error("emailAlreadyInUse")]
    EmailAlreadyInUse,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct Record {
    #[allow(dead_code)]
    id: Thing,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct User {
    username: String,
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
        return Err(Error::PasswordNotEquals);
    }
    if password.len() < 8 {
        return Err(Error::InvalidPasswordLenght("tooShortPassword".to_string()));
    }
    if password.len() > 255 {
        return Err(Error::InvalidPasswordLenght("tooLongPassword".to_string()));
    }
    let password_regex = Regex::new(r#"^((?!.*[\s"';])(?=.*[A-Z])(?=.*\d).{8,255})$"#).unwrap();
    if !password_regex.is_match(password).unwrap() {
        return Err(Error::InvalidPassword);
    }
    let email_regex = Regex::new(
        r"^([a-z0-9_+]([a-z0-9_+.]*[a-z0-9_+])?)@([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6})",
    )
    .unwrap();
    if !email_regex.is_match(email).unwrap() {
        return Err(Error::InvalidEmail);
    }
    let username_regex =
        Regex::new(r"^(?=.{3,64}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$").unwrap();
    if !username_regex.is_match(username).unwrap() {
        return Err(Error::InvalidUsername("invalidUsername".to_string()));
    }
    let connection: Result<Surreal<ws::Client>, surrealdb::Error> =
        Surreal::new::<Ws>("127.0.0.1:8000").await;
    let db: Surreal<ws::Client>;
    match connection {
        Ok(client) => db = client,
        Err(surrealdb::Error::Api(surrealdb::error::Api::Ws(_))) => {
            return Err(Error::Connection("wSError".to_string()))
        }
        Err(surrealdb::Error::Api(_)) => {
            return Err(Error::Connection("connectionError".to_string()))
        }
        Err(surrealdb::Error::Db(_)) => {
            return Err(Error::Connection("connectionError".to_string()))
        }
    }
    db.signin(surrealdb::opt::auth::Root {
        username: "root",
        password: "pic1",
    })
    .await?;
    db.use_ns("test").use_db("test").await?;

    let mut utente = db
        .query(format!(r#"SELECT * FROM users WHERE email="{}""#, email))
        .await?;
    let esiste: Option<User> = utente.take(0)?;
    match esiste {
        Some(_) => return Err(Error::EmailAlreadyInUse),
        None => (),
    }

    let result: Result<_, surrealdb::Error> = db
        .create(("users", username))
        .content(User {
            username: username.to_string(),
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
async fn login(username_email: &str, password: &str) -> Result<User, Error> {
    let mut username: bool = true;
    let password_regex = Regex::new(r#"^((?!.*[\s"';])(?=.*[A-Z])(?=.*\d).{8,255})$"#).unwrap();
    if !password_regex.is_match(password).unwrap() {
        return Err(Error::UserNotExists);
    }
    let email_regex = Regex::new(
        r"^([a-z0-9_+]([a-z0-9_+.]*[a-z0-9_+])?)@([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6})",
    )
    .unwrap();
    if !email_regex.is_match(username_email).unwrap() {
        let username_regex =
            Regex::new(r"^(?=.{3,64}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$").unwrap();
        if !username_regex.is_match(username_email).unwrap() {
            return Err(Error::UserNotExists);
        }
    } else {
        username = false;
    }
    let db = Surreal::new::<Ws>("127.0.0.1:8000").await?;
    db.signin(surrealdb::opt::auth::Root {
        username: "root",
        password: "pic1",
    })
    .await?;
    db.use_ns("test").use_db("test").await?;
    let mut utente: surrealdb::Response;
    if username {
        utente = db
            .query(format!(
                r#"SELECT * FROM users WHERE id="users:{username_email}" and password="{password}""#
            ))
            .await?;
    } else {
        utente = db
            .query(format!(
                r#"SELECT * FROM users WHERE email="{username_email}" and password="{password}""#
            ))
            .await?;
    }
    let esiste: Option<User> = utente.take(0)?;
    match esiste {
        Some(user) => Ok(user),
        None => Err(Error::UserNotExists),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![signup, login])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
