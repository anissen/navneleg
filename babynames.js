angular.module('babyNamesApp', [])
  .controller('BabyNamesController', function($window) {
    var nameList = this;
    nameList.good = [];
    nameList.bad = [];
    nameList.names = [];
 
    function save() {
        storage.setItem('names', JSON.stringify(nameList.names));
        storage.setItem('names_good', JSON.stringify(nameList.good));
        storage.setItem('names_bad', JSON.stringify(nameList.bad));
    }

    nameList.battle = function() {
        save();

        function get_name() {
            if (nameList.names.length == 0) return '?';
            return nameList.names.splice(Math.floor(nameList.names.length * Math.random()), 1)[0];
        }

        nameList.nameA = get_name();
        nameList.nameB = get_name();

    }

    nameList.select = function(good_names, bad_names) {
        nameList.good = nameList.good.concat(good_names.filter(function(n) {
            return (nameList.good.indexOf(n) == -1);
        }));
        nameList.bad = nameList.bad.concat(bad_names.filter(function(n) {
            return (nameList.bad.indexOf(n) == -1);
        }))

        nameList.battle();
    }

    nameList.decide_later = function() {
        nameList.names = nameList.names.concat([nameList.nameA, nameList.nameB]);

        nameList.battle();
    }

    nameList.undo = function(name) {
        if (nameList.good.indexOf(name) > -1) nameList.good.splice(nameList.good.indexOf(name), 1);
        if (nameList.bad.indexOf(name) > -1)  nameList.bad.splice(nameList.bad.indexOf(name), 1);
        nameList.names.push(name);
    }

    nameList.try_again_with_good = function() {
        nameList.names = nameList.good;
        nameList.good = [];
        nameList.bad = [];

        nameList.battle();
    }

    nameList.add_names = function(names) {
        var valid_names = names.filter(function(n) {
            return (nameList.names.indexOf(n) == -1);
        });
        nameList.names = nameList.names.concat(valid_names);

        nameList.battle();
    }

    nameList.get_short_names_list = function() {
        if (nameList.names.length <= 6) return nameList.names;
        return nameList.names.slice(0, 3).concat(["......"]).concat(nameList.names.slice(-3));
    }

    nameList.get_json = function() {
        return encodeURIComponent(JSON.stringify(nameList.good));
    }

    nameList.get_file_url = function() {
        return $window.URL.createObjectURL(new Blob([JSON.stringify(nameList.good)], { type: 'text/json' }))
        // var blob = new Blob(nameList.good, { type: 'text/json' });
        // var url = $window.URL || $window.webkitURL;
        // return url.createObjectURL(blob);
    }

    function reset() {
        nameList.names = ["Abraham", "Absalon", "Adam", "Adrian", "Agge", "Agnar", "Agne", "Agner", "Agnus", "Aksel", "Albert", "Albertino", "Albertinus", "Albertus", "Albinus", "Albion", "Albus", "Alex", "Alf", "Allan", "Alvin", "Amadeus", "Ambjørn", "Amin", "Anakin", "Anders", "André", "Andreas", "Andrew", "Andy", "Anker", "Ansgar", "Anton", "Apollo", "Aragorn", "Archibald", "Archimedes", "Arendt", "Aristoteles", "Arkilles", "Arkimedes", "Arn", "Arne", "Arnfred", "Arngrim", "Arni", "Arno", "Arnold", "Arthur", "Arv", "Arvid", "Asbjørn", "Ask", "Askbjørn", "Aske", "Asker", "Askild", "Aslak", "Asmund", "Asmus", "Asp", "Aspen", "Asser", "Astor", "Atlas", "Atle", "August", "Augustinus", "Augustus", "Aurelius", "Austin", "Axel", "Baldrian", "Baldur", "Balthazar", "Balther", "Bane", "Bark", "Barney", "Bart", "Bartal", "Bartel", "Barthold", "Bartolin", "Bartolomæus", "Bastian", "Ben", "Bendix", "Benedict", "Beni", "Benjamin", "Benno", "Benny", "Bent", "Beowulf", "Bernie", "Bernt", "Bert", "Bertel", "Bertil", "Bertram", "Bilbo", "Bille", "Billy", "Bimmer", "Birk", "Bjarke", "Bjarne", "Bjørgvin", "Bjørk", "Bjørn", "Blob", "Bo", "Bob", "Bobber", "Bobby", "Boris", "Bosse", "Brage", "Brian", "Brix", "Bror", "Bruno", "Brutus", "Bubber", "Bue", "Buller", "Buster", "Bøje", "Børge", "Baard", "Calvin", "Cameron", "Carlo", "Carlos", "Cecil", "Cedric", "Charles", "Charlie", "Chester", "Claes", "Clark", "Claude", "Claudio", "Clement", "Clifford", "Clint", "Clinton", "Clive", "Clyde", "Colin", "Connor", "Cooper", "Cornelius", "Dalton", "Damian", "Dan", "Daniel", "Danny", "Dante", "Dario", "Darwin", "Dave", "David", "Dean", "Dennis", "Denny", "Denzel", "Dexter", "Didrik", "Diego", "Dieter", "Dietmar", "Dino", "Dirch", "Ditlev", "Ditmar", "Donald", "Donni", "Donovan", "Douglas", "Dreng", "Duncan", "Dustin", "Dylan", "Eddie", "Edgar", "Edison", "Edmond", "Edvin", "Edward", "Egbert", "Ege", "Egmont", "Egon", "Einar", "Eino", "Eivind", "Elias", "Elliot", "Elmer", "Elof", "Elton", "Elwood", "Emil", "Enevold", "Engelbrecht", "Enok", "Erik", "Erland", "Erling", "Ernst", "Erwin", "Esben", "Eske", "Fabricius", "Falk", "Falke", "Felix", "Fenris", "Ferdinand", "Fessor", "Fester", "Fillip", "Finn", "Flemming", "Flint", "Floke", "Floyd", "Folke", "Folmer", "Francis", "Frank", "Frankie", "Frans", "Freddie", "Frede", "Frederik", "Fridolin", "Fridtjof", "Frits", "Frode", "Frodo", "Galileo", "Gandalf", "Gary", "Gekko", "Geo", "Georg", "Gerard", "Gerhard", "Gert", "Gilbert", "Glenn", "Godtfred", "Goliat", "Gotfred", "Greg", "Gregers", "Gregory", "Grunk", "Gudmund", "Gunnar", "Gustav", "Günther", "Halfdan", "Halvor", "Hamilton", "Hamlet", "Hannibal", "Hans", "Hansi", "Harald", "Hardy", "Harry", "Harvey", "Hasse", "Hector", "Helge", "Helmuth", "Henning", "Henrik", "Henry", "Herbert", "Herkules", "Herman", "Hilbert", "Hilmer", "Holger", "Howard", "Hubert", "Hubertus", "Hugo", "Huxi", "Håkon", "Ib", "Ibrahim", "Igor", "Ingbert", "Ingeman", "Ingmar", "Ingolf", "Irwing", "Isak", "Ivan", "Ivar", "Jackson", "Jacob", "Jake", "Jakob", "James", "Jamie", "Jan", "Jannick", "Janus", "Jarl", "Jason", "Jasper", "Jean", "Jefferson", "Jens", "Jeppe", "Jeremy", "Jerry", "Jesper", "Jessie", "Jimmy", "Joakim", "Job", "Joe", "Johan", "Johannes", "John", "Johnny", "Jokum", "Jon", "Jonathan", "Jones", "Josef", "Julius", "Junior", "Jørg", "Jørgen", "Jørn", "Kalle", "Kalmar", "Kalvin", "Karl", "Karlo", "Karlos", "Karsten", "Kasper", "Keanu", "Keld", "Kelvin", "Ken", "Kennedy", "Kermit", "Kian", "Kim", "King", "Kingo", "Kingston", "Kirk", "Klaus", "Klint", "Knud", "Korfitz", "Kornelius", "Krede", "Kresten", "Kris", "Kristian", "Kristof", "Kurt", "Kyle", "Kåre", "Lance", "Lancelot", "Larry", "Lars", "Lauge", "Lauritz", "Laust", "Lawrence", "Leander", "Leeroy", "Legolas", "Leif", "Lennart", "Leon", "Leopold", "Liam", "Lincoln", "Lindhardt", "Linus", "Lionel", "Loke", "Ludwig", "Lukas", "Madsbjørn", "Magne", "Magnus", "Malcolm", "Malthe", "Manfred", "Manse", "Marcel", "Mario", "Marius", "Mark", "Marko", "Markus", "Martin", "Matheus", "Mathias", "Max", "Maxim", "Maximilian", "Maximus", "Maxwell", "Melchior", "Melvin", "Micklas", "Mike", "Mikkel", "Milo", "Milton", "Mio", "Mitch", "Mitchell", "Mogens", "Morgan", "Moses", "Murphy", "Napoleon", "Nate", "Nathan", "Nathaniel", "Neil", "Nelson", "Nero", "Nestor", "Neville", "Newton", "Nexus", "Nick", "Nicky", "Niels", "Niklas", "Nikolaj", "Nikolas", "Niller", "Nimbus", "Nis", "Nixon", "Noah", "Noel", "Norman", "Odbjørn", "Odin", "Odysseus", "Olaf", "Olafur", "Olav", "Ole", "Oliver", "Ollie", "Oluf", "Opie", "Orion", "Orla", "Orville", "Oswald", "Othello", "Otis", "Otto", "Ove", "Owen", "Ozzy", "Pablo", "Palle", "Parker", "Pascal", "Patrick", "Paulus", "Paw", "Pedro", "Pelle", "Per", "Percy", "Perry", "Pete", "Philip", "Pierre", "Pilou", "Platon", "Polle", "Pondus", "Poul", "Preben", "Preston", "Quintus", "Rafael", "Ragnar", "Ragnvald", "Ralf", "Randy", "Ras", "Rask", "Rasmus", "Ravn", "Ray", "Reginald", "Reimer", "Reinhard", "Reinholdt", "René", "Rex", "Ricco", "Richard", "Rick", "Ricky", "Roald", "Robbie", "Robert", "Robin", "Roger", "Roland", "Rolf", "Romeo", "Ronald", "Ronaldo", "Ronny", "Ross", "Ruben", "Rudi", "Rudolf", "Rufus", "Rumle", "Ryan", "Salomon", "Sam", "Sammy", "Samson", "Samuel", "Scott", "Sean", "Seb", "Sebastian", "Sejr", "Shane", "Sherlock", "Sigfred", "Sigurd", "Simon", "Sirius", "Skjold", "Sofus", "Sonny", "Stan", "Stanley", "Stefan", "Steff", "Steffen", "Sten", "Steve", "Steven", "Stewart", "Stig", "Stinus", "Stoffer", "Storm", "Stærkodder", "Ståle", "Sullivan", "Sune", "Svante", "Svend", "Sylvester", "Sønnik", "Søren", "Tage", "Tarzan", "Tau", "Tavs", "Taylor", "Ted", "Teddy", "Teitur", "Tello", "Tellus", "Thejs", "Theo", "Theodor", "Therkel", "Therkild", "Thomas", "Thorbjørn", "Thorkild", "Thøger", "Tiberius", "Timmy", "Tinus", "Tjalfe", "Tjelle", "Tobias", "Toby", "Toke", "Toki", "Tom", "Tommy", "Tonni", "Tony", "Tor", "Toto", "Totte", "Travis", "Tristan", "Triton", "Troels", "Trolle", "Tue", "Ture", "Tyge", "Tyler", "Tyr", "Ubbe", "Uffe", "Ulf", "Ulrik", "Ulv", "Vagn", "Vagner", "Valde", "Valdemar", "Verner", "Viggo", "Vik", "Viktor", "Villads", "Villum", "Vincent", "Vitus", "Vladimir", "Våge", "Walther", "Wayne", "Wesley", "Wilbert", "Wilbur", "Wilhelm", "Wiliam", "Willy", "Xander", "Yngve", "Yoda", "Zack", "Zakarias", "Zorro", "Øjvind", "Ørn", "Øystein", "Åge"];
        nameList.good = [];
        nameList.bad = [];
    }

    nameList.reset_all_names = function() {
        if (confirm("Dette vil nulstille alle navne. Vil du fortsætte?")) {
            reset();
            nameList.battle();
        }
    }

    nameList.clear_all_names = function() {
        if (confirm("Dette vil fjerne alle navne. Vil du fortsætte?")) {
            nameList.names = [];
            nameList.good = [];
            nameList.bad = [];
        }
    }

    var storage = window.localStorage;
    nameList.names = JSON.parse(storage.getItem("names"));
    nameList.good = JSON.parse(storage.getItem("names_good")) || [];
    nameList.bad = JSON.parse(storage.getItem("names_bad")) || [];
    if (nameList.names == null) {
        reset();
    }
    
    nameList.battle();
  })
.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
        element.bind("change", function (changeEvent) {
            var reader = new FileReader();
            reader.onload = function(loadEvent) {
                if (!loadEvent.returnValue) return;
                var loadedNames = [];
                try {
                    loadedNames = JSON.parse(loadEvent.target.result);
                } catch (e) {
                    alert('Fejl ved læsning af fil: ' + e);
                }
                scope.$apply(function () {
                    scope.nameList.add_names(loadedNames);
                });
            }
            reader.readAsText(changeEvent.target.files[0]);
        });
    }
  };
})
.directive('filedownload', function() {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            if (element[0].tagName !== 'A') {
                return;  // simply do nothing (or raise an error)
            }
            element[0].href = $scope.nameList.get_file_url();
        }
    };
 });

