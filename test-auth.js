const { register, login } = require("./auth");

(async () => {

    console.log(await register(
        "dave",
        "dave@test.com",
        "123456"
    ));

    console.log(await login(
        "dave@test.com",
        "123456"
    ));

})();
