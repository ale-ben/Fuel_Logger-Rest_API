// @generated automatically by Diesel CLI.

diesel::table! {
    fuelentries (id) {
        id -> Int4,
        date -> Timestamp,
        amount -> Float8,
        cost -> Float8,
        fuellog -> Int4,
    }
}

diesel::table! {
    fuellogs (id) {
        id -> Int4,
        odometer -> Float8,
        flagged -> Bool,
    }
}

diesel::joinable!(fuelentries -> fuellogs (fuellog));

diesel::allow_tables_to_appear_in_same_query!(
    fuelentries,
    fuellogs,
);
