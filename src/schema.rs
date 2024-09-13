// @generated automatically by Diesel CLI.

diesel::table! {
    fuelLog (id) {
        id -> Integer,
        date -> Text,
        odometer -> Float,
        amount -> Float,
        cost -> Float,
    }
}
