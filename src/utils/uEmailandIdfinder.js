const uEmailandIdfinder = (req, wantvalue) => {

    if (wantvalue == 'email') {
        return req.headers["x-user-email"];
    } else if (wantvalue == 'id') {
        return req.headers["x-user-id"];
    } else if (wantvalue == 'role') {
        return req.headers["x-user-role"];
    } else {
        return null;
    }

}

export default uEmailandIdfinder;