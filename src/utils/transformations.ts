export const capitalize = (name : string) => {
    // todo: build this function
    // `capitalize("jOn")` should output `"Jon"`
    name = name.toLowerCase();
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export const formatPhoneNumber = (phoneNumber : string) => {
    // todo: build this function
    // `formatPhoneNumber("1234567")` should be `"12-34-56-7"`
    if (phoneNumber?.length === 7) {
        return phoneNumber.toString().slice(0, 2) + "-" + phoneNumber.slice(2, 4) + "-" + phoneNumber.slice(4, 6) + "-" + phoneNumber.slice(6, 7);
    }
}