var express = require('express');
var timers = require('timers');
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

app.get('/person/:programId/:personId', (req, res) => {
    const person = {
        email_address: "jhoughtelin+bender@alldigitalrewards.com",
        unique_id: req.params.personId,
        program: req.params.programId,
        credit: req.query.credit ?? 999999,
        firstname: req.query.firstname ?? "Bender",
        lastname: req.query.lastname ?? "R.",
        language: req.query.language ?? "en_US",
        address: {
            firstname: req.query.firstname ?? "Bender",
            lastname: req.query.lastname ?? "R.",
            address1: req.query.address1 ?? "1337 Haxor Drive",  // Incorrect address for testing AVS
            address2: req.query.address2 ?? "",
            city: req.query.city ?? "Washington",
            state: req.query.state ?? "DC",
            zip: req.query.zip ?? "20500",
            country: req.query.country ?? "840",
            country_code: req.query.country_code ?? "US"
        },
    };

    res.json(person)
});

/**
 * Authorize Transactions
 */
app.all('/transaction_authorization', (req, res) => {
    res.json({
        authorization_id: "A Fishful Of Dollars"
    });
});

/**
 * Returning an HTTP status.
 */
app.all('/http_status/:status', [param('status').exists().toInt().isNumeric()], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    res.status(req.params.status).send();
});

app.all('/delayed_response/:time_in_seconds', [param('time_in_seconds').exists().toInt().isNumeric()], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
    /**
     * Who the fuck does this?
     * ╭∩╮(Ο_Ο)╭∩╮
     */
    let send = res.send;
    res.send = function () {
        let args = arguments;
        timers.setTimeout(function () {
            send.apply(res, args)
        }, req.params.time_in_seconds * 1000);
    }

    res.send();
});

app.listen(80, () => {
    console.log("My Story Is A Lot Like Yours, Only More Interesting ‘Cause It Involves Robots.");
});
