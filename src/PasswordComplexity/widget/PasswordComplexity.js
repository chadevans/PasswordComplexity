/*
    PasswordComplexity
    ========================

    @file      : PasswordComplexity.js
    @version   : 0.1
    @author    : Chad Evans
    @date      : 22 Sep 2015
    @copyright : 2015, Mendix B.v.
    @license   : Apache v2

    Documentation
    ========================
    Adding password complexity feedback, based on https://www.danpalmer.me/jquery-complexify/.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",
    "PasswordComplexity/lib/jquery-1.11.2",
    "PasswordComplexity/lib/jquery.complexify",
    "dojo/text!PasswordComplexity/widget/template/PasswordComplexity.html"
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle,
    dojoConstruct, dojoArray, dojoLang, dojoText, dojoHtml, dojoEvent,
    _jQuery, _complexify, widgetTemplate) {
    "use strict";

    var $ = _jQuery.noConflict(true);

    /*
	Generated from 500 worst passwords and 401 banned twiiter passwords as of 20150520.
	@source http://www.skullsecurity.org/wiki/index.php/Passwords

	Filtered to remove any passwords shorter than 4 characters, as these will cause
	unwanted behaviour when in strict banning mode.
*/
    var MX_COMPLEXIFY_BANLIST = "000000|111111|11111111|112233|121212|123123|123456|1234567|12345678|123456789|131313|232323|654321|666666|696969|777777|7777777|8675309|987654|nnnnnn|nop123|nopqrs|noteglh|npprff|npprff14|npgvba|nyoreg|nyoregb|nyrkvf|nyrwnaqen|nyrwnaqeb|nznaqn|nzngrhe|nzrevpn|naqern|naqerj|natryn|natryf|navzny|nagubal|ncbyyb|nccyrf|nefrany|neguhe|nfqstu|nfuyrl|nffubyr|nhthfg|nhfgva|onqobl|onvyrl|onanan|onearl|onfronyy|ongzna|orngevm|ornire|ornivf|ovtpbpx|ovtqnqql|ovtqvpx|ovtqbt|ovtgvgf|oveqvr|ovgpurf|ovgrzr|oynmre|oybaqr|oybaqrf|oybjwbo|oybjzr|obaq007|obavgn|obaavr|obbobb|obbtre|obbzre|obfgba|oenaqba|oenaql|oenirf|oenmvy|oebapb|oebapbf|ohyyqbt|ohfgre|ohggre|ohggurnq|pnyiva|pnzneb|pnzreba|pnanqn|pncgnva|pneybf|pnegre|pnfcre|puneyrf|puneyvr|purrfr|puryfrn|purfgre|puvpntb|puvpxra|pbpnpbyn|pbssrr|pbyyrtr|pbzcnd|pbzchgre|pbafhzre|pbbxvr|pbbcre|pbeirggr|pbjobl|pbjoblf|pelfgny|phzzvat|phzfubg|qnxbgn|qnyynf|qnavry|qnavryyr|qroovr|qraavf|qvnoyb|qvnzbaq|qbpgbe|qbttvr|qbycuva|qbycuvaf|qbanyq|qentba|qernzf|qevire|rntyr1|rntyrf|rqjneq|rvafgrva|rebgvp|rfgeryyn|rkgerzr|snypba|sraqre|sreenev|sveroveq|svfuvat|sybevqn|sybjre|sylref|sbbgonyy|sberire|serqql|serrqbz|shpxrq|shpxre|shpxvat|shpxzr|shpxlbh|tnaqnys|tngrjnl|tngbef|trzvav|trbetr|tvnagf|tvatre|tvmzbqb|tbyqra|tbysre|tbeqba|tertbel|thvgne|thaare|unzzre|unaanu|uneqpber|uneyrl|urngure|uryczr|uragnv|ubpxrl|ubbgref|ubearl|ubgqbt|uhagre|uhagvat|vprzna|vybirlbh|vagrearg|vjnagh|wnpxvr|wnpxfba|wnthne|wnfzvar|wnfcre|wraavsre|wrerzl|wrffvpn|wbuaal|wbuafba|wbeqna|wbfrcu|wbfuhn|whavbe|whfgva|xvyyre|xavtug|ynqvrf|ynxref|ynhera|yrngure|yrtraq|yrgzrva|yvggyr|ybaqba|ybiref|znqqbt|znqvfba|znttvr|zntahz|znevar|znevcbfn|zneyobeb|znegva|zneiva|znfgre|zngevk|znggurj|znirevpx|znkjryy|zryvffn|zrzore|zreprqrf|zreyva|zvpunry|zvpuryyr|zvpxrl|zvqavtug|zvyyre|zvfgerff|zbavpn|zbaxrl|zbafgre|zbetna|zbgure|zbhagnva|zhssva|zhecul|zhfgnat|anxrq|anfpne|anguna|anhtugl|app1701|arjlbex|avpubynf|avpbyr|avccyr|avccyrf|byvire|benatr|cnpxref|cnagure|cnagvrf|cnexre|cnffjbeq|cnffjbeq1|cnffjbeq12|cnffjbeq123|cngevpx|crnpurf|crnahg|crccre|cunagbz|cubravk|cynlre|cyrnfr|cbbxvr|cbefpur|cevapr|cevaprff|cevingr|checyr|chffvrf|dnmjfk|djregl|djreglhv|enoovg|enpury|enpvat|envqref|envaobj|enatre|enatref|erorppn|erqfxvaf|erqfbk|erqjvatf|evpuneq|eboreg|eboregb|ebpxrg|ebfrohq|ehaare|ehfu2112|ehffvn|fnznagun|fnzzl|fnzfba|fnaqen|fnghea|fpbbol|fpbbgre|fpbecvb|fpbecvba|fronfgvna|frperg|frkfrk|funqbj|funaaba|funirq|fvreen|fvyire|fxvccl|fynlre|fzbxrl|fabbcl|fbppre|fbcuvr|fcnaxl|fcnexl|fcvqre|fdhveg|fevavinf|fgnegerx|fgnejnef|fgrryref|fgrira|fgvpxl|fghcvq|fhpprff|fhpxvg|fhzzre|fhafuvar|fhcrezna|fhesre|fjvzzvat|flqarl|grdhvreb|gnlybe|graavf|grerfn|grfgre|grfgvat|gurzna|gubznf|guhaqre|guk1138|gvssnal|gvtref|gvttre|gbzpng|gbctha|gblbgn|genivf|gebhoyr|gehfgab1|ghpxre|ghegyr|gjvggre|havgrq|intvan|ivpgbe|ivpgbevn|ivxvat|ibbqbb|iblntre|jnygre|jneevbe|jrypbzr|jungrire|jvyyvnz|jvyyvr|jvyfba|jvaare|jvafgba|jvagre|jvmneq|knivre|kkkkkk|kkkkkkkk|lnznun|lnaxrr|lnaxrrf|lryybj|mkpioa|mkpioaz|mmmmmm|password|1234|pussy|12345|dragon|qwerty|mustang|letmein|baseball|master|michael|football|shadow|monkey|abc123|pass|fuckme|6969|jordan|harley|ranger|iwantu|jennifer|hunter|fuck|2000|test|batman|trustno1|thomas|tigger|robert|access|love|buster|soccer|hockey|killer|george|sexy|andrew|charlie|superman|asshole|fuckyou|dallas|jessica|panties|pepper|1111|austin|william|daniel|golfer|summer|heather|hammer|yankees|joshua|maggie|biteme|enter|ashley|thunder|cowboy|silver|richard|fucker|orange|merlin|michelle|corvette|bigdog|cheese|matthew|patrick|martin|freedom|ginger|blowjob|nicole|sparky|yellow|camaro|secret|dick|falcon|taylor|bitch|hello|scooter|please|porsche|guitar|chelsea|black|diamond|nascar|jackson|cameron|computer|amanda|wizard|xxxxxxxx|money|phoenix|mickey|bailey|knight|iceman|tigers|purple|andrea|horny|dakota|aaaaaa|player|sunshine|morgan|starwars|boomer|cowboys|edward|charles|girls|booboo|coffee|xxxxxx|bulldog|ncc1701|rabbit|peanut|john|johnny|gandalf|spanky|winter|brandy|compaq|carlos|tennis|james|mike|brandon|fender|anthony|blowme|ferrari|cookie|chicken|maverick|chicago|joseph|diablo|sexsex|hardcore|willie|welcome|chris|panther|yamaha|justin|banana|driver|marine|angels|fishing|david|maddog|hooters|wilson|butthead|dennis|fucking|captain|bigdick|chester|smokey|xavier|steven|viking|snoopy|blue|eagles|winner|samantha|house|miller|flower|jack|firebird|butter|united|turtle|steelers|tiffany|zxcvbn|tomcat|golf|bond007|bear|tiger|doctor|gateway|gators|angel|junior|thx1138|porno|badboy|debbie|spider|melissa|booger|1212|flyers|fish|porn|matrix|teens|scooby|jason|walter|cumshot|boston|braves|yankee|lover|barney|victor|tucker|princess|mercedes|5150|doggie|zzzzzz|gunner|horney|bubba|2112|fred|johnson|xxxxx|tits|member|boobs|donald|bigdaddy|bronco|penis|voyager|rangers|birdie|trouble|white|topgun|bigtits|bitches|green|super|qazwsx|magic|lakers|rachel|slayer|scott|2222|asdf|video|london|7777|marlboro|srinivas|internet|action|carter|jasper|monster|teresa|jeremy|bill|crystal|peter|pussies|cock|beer|rocket|theman|oliver|prince|beach|amateur|muffin|redsox|star|testing|shannon|murphy|frank|hannah|dave|eagle1|11111|mother|nathan|raiders|steve|forever|angela|viper|ou812|jake|lovers|suckit|gregory|buddy|whatever|young|nicholas|lucky|helpme|jackie|monica|midnight|college|baby|cunt|brian|mark|startrek|sierra|leather|4444|beavis|bigcock|happy|sophie|ladies|naughty|giants|booty|blonde|fucked|golden|fire|sandra|pookie|packers|einstein|dolphins|chevy|winston|warrior|sammy|slut|zxcvbnm|nipples|power|victoria|asdfgh|vagina|toyota|travis|hotdog|paris|rock|xxxx|extreme|redskins|erotic|dirty|ford|freddy|arsenal|access14|wolf|nipple|iloveyou|alex|florida|eric|legend|movie|success|rosebud|jaguar|great|cool|cooper|1313|scorpio|mountain|madison|brazil|lauren|japan|naked|squirt|stars|apple|alexis|aaaa|bonnie|peaches|jasmine|kevin|matt|qwertyui|danielle|beaver|4321|4128|runner|swimming|dolphin|gordon|casper|stupid|shit|saturn|gemini|apples|august|3333|canada|blazer|cumming|hunting|kitty|rainbow|arthur|cream|calvin|shaved|surfer|samson|kelly|paul|mine|king|racing|5555|eagle|hentai|newyork|little|redwings|smith|sticky|cocacola|animal|broncos|private|skippy|marvin|blondes|enjoy|girl|apollo|parker|qwert|time|sydney|women|voodoo|magnum|juice|abgrtyu|dreams|maxwell|music|rush2112|russia|scorpion|rebecca|tester|mistress|phantom|billy|6666|albert|abcdef|password1|password12|password123|twitter".split("|");


    // Declare widget's prototype.
    return declare("PasswordComplexity.widget.PasswordComplexity", [_WidgetBase, _TemplatedMixin], {
        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,

        // DOM elements
        progressNode: null,

        // Parameters configured in the Modeler.
        passwordSelector: "",
        complexityPattern: "",
        useBanList: true,

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _options: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {},

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            console.log(this.id + ".postCreate");

            this._setupEvents();
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            console.log(this.id + ".update");

            this._contextObj = obj;
            this._updateRendering();

            callback();
        },

        // Attach events to HTML dom elements
        _setupEvents: function () {
            dojoClass.toggle(this.progressNode, "progress-bar-danger");
            this._updateText(0);

            this._options = {};

            if (this.useBanList) {
                this._options.bannedPasswords = MX_COMPLEXIFY_BANLIST;
            }
        },

        _updateText: function (value) {
            var str = this.complexityPattern.split("{0}").join(Math.round(value));

            dojoHtml.set(this.progressNode, str);
        },

        // Rerender the interface.
        _updateRendering: function () {
            $(this.passwordSelector).complexify(this._options, dojoLang.hitch(this, function (valid, complexity) {
                dojoClass.toggle(this.progressNode, "progress-bar-success", valid);
                dojoClass.toggle(this.progressNode, "progress-bar-danger", !valid);
                dojoStyle.set(this.progressNode, {
                    width: complexity + "%"
                });

                this._updateText(complexity);
            }));
        }
    });
});

require(["PasswordComplexity/widget/PasswordComplexity"], function () {
    "use strict";
});