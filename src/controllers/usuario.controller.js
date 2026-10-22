const bcrypt = require("bcryptjs")
const db = require("../config/db")
const {httpError, requireFields, checkCredentials} = require("../utils")

const NIVELES = ["ADMIN", "USUARIO"]