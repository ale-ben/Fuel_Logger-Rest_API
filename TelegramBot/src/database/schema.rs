// @generated automatically by Diesel CLI.

diesel::table! {
    fuelentries (id) {
        id -> Int4,
        date -> Timestamp,
        amount -> Float4,
        cost -> Float4,
        fuellog -> Int4,
    }
}

diesel::table! {
    fuellogs (id) {
        id -> Int4,
        odometer -> Float4,
        flagged -> Bool,
    }
}

diesel::joinable!(fuelentries -> fuellogs (fuellog));

diesel::allow_tables_to_appear_in_same_query!(
    fuelentries,
    fuellogs,
);
