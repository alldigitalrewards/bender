var express = require('express');
var app = express();
const {param, validationResult} = require('express-validator');

app.get('/', (req, res) => {
    res.send('<pre>Bender\n' +
        '\n' +
        '            o\n' +
        '            |\n' +
        '          ,\'~\'.\n' +
        '         /     \\\n' +
        '        |   ____|_\n' +
        '        |  \'___,,_\'         .----------------.\n' +
        '        |  ||(o |o)|       ( KILL ALL HUMANS! )\n' +
        '        |   -------         ,----------------\'\n' +
        '        |  _____|         -\'\n' +
        '        \\  \'####,\n' +
        '         -------\n' +
        '       /________\\\n' +
        '     (  )        |)\n' +
        '     \'_ \' ,------|\\         _\n' +
        '    /_ /  |      |_\\        ||\n' +
        '   /_ /|  |     o| _\\      _||\n' +
        '  /_ / |  |      |\\ _\\____//\' |\n' +
        ' (  (  |  |      | (_,_,_,____/\n' +
        '  \\ _\\ |   ------|\n' +
        '   \\ _\\|_________|\n' +
        '    \\ _\\ \\__\\\\__\\\n' +
        '    |__| |__||__|\n' +
        ' ||/__/  |__||__|\n' +
        '         |__||__|\n' +
        '         |__||__|\n' +
        '         /__)/__)\n' +
        '        /__//__/\n' +
        '       /__//__/\n' +
        '      /__//__/.\n' +
        '    .\'    \'.   \'.\n' +
        '   (_kOs____)____)\n' +
        '\n' +
        '------------------------------------------------\n' +
        'This ASCII pic can be found at\n' +
        'https://asciiart.website/index.php?art=television/futurama\n');
});

app.get('/person/:personId', (req, res) => {
    const person = {
        email_address: "jhoughtelin+bender@alldigitalrewards.com",
        unique_id: req.params.personId,
        credit: 999999,
        firstname: "Bender",
        lastname: "Rodriguez",
        language: "en_US",
        address: {
            firstname: "Bender",
            lastname: "Rodriguez",
            address1: "1337 Haxor Drive",  // Incorrect address for testing AVS
            address2: "",
            city: "Washington",
            state: "DC",
            zip: "20500",
            country: "840",
            country_code: "US"
        },
    };

    res.json(person)
});

/**
 * Returning an HTTP status.
 */
app.get('/http_status/:status', [param('status').exists().toInt().isNumeric()], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    res.status(req.params.status.toInt()).send();
});

app.listen(80, () => {
    console.log("My Story Is A Lot Like Yours, Only More Interesting ‘Cause It Involves Robots.");
});
