import type { Song } from '../types/music';

// ── Seed-based deterministic hash ────────────────────────────────────────────
function hash(n: number): number {
  let x = ((n >>> 16) ^ n) * 0x45d9f3b;
  x = ((x >>> 16) ^ x) * 0x45d9f3b;
  x = (x >>> 16) ^ x;
  return Math.abs(x);
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

// ── Genres ────────────────────────────────────────────────────────────────────
export const GENRES = [
  'Pop', 'Rock', 'Hip-Hop', 'R&B', 'Electronic', 'Jazz', 'Classical',
  'Country', 'Reggae', 'Blues', 'Soul', 'Funk', 'Metal', 'Punk',
  'Indie', 'Folk', 'Latin', 'K-Pop', 'Afrobeats', 'Ambient',
  'Disco', 'Gospel', 'Grunge', 'Trap', 'Lo-Fi',
  'Reggaeton', 'EDM', 'Dancehall', 'J-Pop', 'Bossa Nova',
  'Cumbia', 'Salsa', 'Merengue', 'Bachata', 'Samba',
  'Flamenco', 'Bluegrass', 'Swing', 'Bebop', 'Neo-Soul',
  'Drill', 'Grime', 'Emo', 'Shoegaze', 'Post-Rock',
  'Synthwave', 'Vaporwave', 'Chillhop', 'Drum & Bass', 'House',
];

// ── Genre-specific data pools ─────────────────────────────────────────────────

// K-Pop
const KPOP_FIRST = [
  'Jimin','Taehyung','Jungkook','Suga','Jin','RM','J-Hope','Lisa','Jennie','Rosé',
  'Jisoo','Irene','Seulgi','Wendy','Joy','Yeri','Baekhyun','Chanyeol','Kai','Sehun',
  'Suho','Xiumin','Chen','Lay','D.O.','Taemin','Key','Minho','Onew','Jonghyun',
  'Hyuna','Sunmi','IU','Taeyeon','Jessica','Tiffany','Yoona','Sooyoung','Yuri','Seohyun',
  'Eunha','SinB','Yuju','Sowon','Yerin','Umji','Nayeon','Jeongyeon','Momo','Sana',
  'Jihyo','Mina','Dahyun','Chaeyoung','Tzuyu','Wheein','Moonbyul','Solar','Hwasa',
];
const KPOP_LAST = [
  'Park','Kim','Lee','Choi','Jung','Kang','Yoon','Lim','Han','Oh',
  'Shin','Kwon','Jeon','Bae','Song','Ahn','Yang','Cho','Hwang','Moon',
];
const KPOP_GROUPS = [
  'BTS','BLACKPINK','EXO','SHINee','TWICE','Red Velvet','MAMAMOO','GFRIEND',
  'GOT7','Stray Kids','ATEEZ','TXT','aespa','IVE','NewJeans','LE SSERAFIM',
  'SEVENTEEN','NCT 127','NCT Dream','WayV','SuperM','MONSTA X','VIXX','ASTRO',
  'PENTAGON','THE BOYZ','CRAVITY','ENHYPEN','TOMORROW X TOGETHER','fromis_9',
];
const KPOP_TITLE_WORDS = [
  'Dynamite','Butter','DNA','Fire','Blood Sweat & Tears','Spring Day','Boy With Luv',
  'Fake Love','IDOL','ON','Savage','Next Level','Black Mamba','Forever','Lovesick Girls',
  'How You Like That','Kill This Love','DDU-DU DDU-DU','Boombayah','Whistle',
  'Fancy','Feel Special','More & More','What Is Love','Likey','TT','Cheer Up',
  'Gee','Oh!','Hoot','The Boys','I Got a Boy','Mr. Mr.','Lion Heart',
  'Growl','Wolf','Overdose','Call Me Baby','Love Me Right','Monster','Power',
  'Lucifer','Ring Ding Dong','Replay','Hello','View','1 of 1','Good Evening',
  'Peek-A-Boo','Bad Boy','Power Up','Zimzalabim','Psycho','Queendom',
  'Starry Night','HIP','Gogobebe','Egotistic','Aze Gag','Um Oh Ah Yeh',
  'Rough','Navillera','Me Gustas Tu','Glass Bead','Fingertip','Time for the Moon Night',
  'Nonstop','Bungee','Dun Dun Dance','Suki Janai','Dolphin','Secret Garden',
];

// Hip-Hop
const HIPHOP_FIRST = [
  'Kendrick','Drake','Jay','Kanye','Lil','Big','Young','Wiz','Chance','J.',
  'Travis','Post','Cardi','Nicki','Megan','Doja','Ice','Snoop','Eminem','50',
  'Nas','Rakim','Biggie','Tupac','Missy','Lauryn','Queen','MC','Busta','DMX',
  'Lil Wayne','Lil Baby','Lil Durk','Lil Uzi','Polo','Gunna','Future','21',
  'A$AP','Pusha','Meek','Rick','Wale','Kid','Mac','Childish','Tyler','Earl',
  'Vince','Danny','Action','Joey','Freddie','Schoolboy','Ab-Soul','Isaiah',
];
const HIPHOP_LAST = [
  'Lamar','Cole','Z','West','Wayne','Savage','Khalifa','Gambino','Scott','Malone',
  'B','Minaj','Thee Stallion','Cat','Cube','Dogg','Elliott','Hill','Latifah','Rhymes',
  'Baby','Durk','Vert','G','Rock','Ross','Mill','Cudi','Brockhampton','Staples',
  'Gibbs','Brown','Bronson','Bada$$','Gibbs','Gibbs','Q','Rashad','Cunningham','Rashad',
];
const HIPHOP_TITLE_WORDS = [
  'Hustle','Grind','Streets','Money','Power','Respect','Real','Trap','Drip','Flex',
  'Sauce','Vibe','Wave','Bars','Flow','Spit','Cypher','Freestyle','Cipher','Verse',
  'Hood','Block','Corner','Avenue','Boulevard','Strip','Concrete','Asphalt','Pavement',
  'Gold','Platinum','Diamond','Ice','Chains','Rings','Watches','Whips','Cribs',
  'Loyalty','Betrayal','Struggle','Rise','Fall','Redemption','Legacy','Empire',
  'Anthem','Banger','Slapper','Heater','Bop','Jam','Hit','Classic','Timeless',
  'Midnight','3AM','Sunrise','Sunset','Neon','City Lights','Skyline','Penthouse',
  'Trap House','Mansion','Penthouse','Rooftop','Balcony','Penthouse Suite',
];

// Reggaeton
const REGGAETON_FIRST = [
  'Bad','J','Daddy','Ozuna','Maluma','Nicky','Farruko','Anuel','Karol','Becky',
  'Lunay','Sech','Jhay','Myke','Rauw','Jhayco','Mora','Eladio','Arcangel','De La Ghetto',
  'Wisin','Yandel','Don','Tego','Voltio','Alexis','Fido','Jowell','Randy','Ñejo',
  'Zion','Lennox','Nicky','Plan B','Trebol','Clan','Cosculluela','Ñengo','Flow',
];
const REGGAETON_LAST = [
  'Bunny','Balvin','Yankee','Ozuna','Maluma','Jam','Cortez','AA','G','G',
  'Cortez','Sech','Cortez','Torres','Alejandro','Cortez','Mora','Carrión','AA','Ghetto',
  'Wisin','Yandel','Omar','Calderon','Voltio','Fido','Jowell','Randy','Ñejo',
];
const REGGAETON_TITLE_WORDS = [
  'Perreo','Dembow','Reggaeton','Perreo Intenso','Tusa','Con Calma','Despacito',
  'Gasolina','Danza Kuduro','Bailando','Lean On','Lean On','Lean On',
  'Lean On','Lean On','Lean On','Lean On','Lean On','Lean On','Lean On',
  'Caliente','Fuego','Pasión','Amor','Corazón','Noche','Fiesta','Baile',
  'Ritmo','Movimiento','Sensación','Vibración','Emoción','Conexión','Atracción',
  'Seducción','Tentación','Obsesión','Adicción','Devoción','Pasión','Traición',
  'Perreando','Bailando','Gozando','Disfrutando','Celebrando','Viviendo',
  'La Calle','El Barrio','La Noche','El Día','La Vida','El Amor','La Música',
];

// Jazz
const JAZZ_FIRST = [
  'Miles','John','Duke','Louis','Charlie','Thelonious','Dizzy','Billie','Ella','Sarah',
  'Chet','Bill','Herbie','Wayne','Chick','McCoy','Keith','Pat','John','Lee',
  'Wes','Grant','Kenny','Freddie','Lee','Clifford','Art','Max','Roy','Buddy',
  'Benny','Glenn','Tommy','Jimmy','Count','Cab','Fats','Jelly','Sidney','Kid',
  'Ornette','Cecil','Sun','Albert','Archie','Pharoah','Yusef','Eric','Sonny','Dexter',
  'Cannonball','Julian','Hank','Horace','Red','Wynton','Branford','Terence','Joshua','Marcus',
];
const JAZZ_LAST = [
  'Davis','Coltrane','Ellington','Armstrong','Parker','Monk','Gillespie','Holiday','Fitzgerald','Vaughan',
  'Baker','Evans','Hancock','Shorter','Corea','Tyner','Jarrett','Metheny','McLaughlin','Konitz',
  'Montgomery','Green','Burrell','Hubbard','Morgan','Brown','Blakey','Haynes','Eldridge','Rich',
  'Goodman','Miller','Dorsey','Dorsey','Basie','Calloway','Waller','Roll Morton','Bechet','Ory',
  'Coleman','Taylor','Ra','Ayler','Shepp','Sanders','Lateef','Dolphy','Rollins','Gordon',
  'Adderley','Adderley','Mobley','Silver','Garland','Marsalis','Marsalis','Blanchard','Redman','Miller',
];
const JAZZ_TITLE_WORDS = [
  'Blue','Autumn','Spring','Summer','Winter','Night','Day','Dawn','Dusk','Twilight',
  'Bebop','Swing','Cool','Hard Bop','Modal','Free','Fusion','Smooth','Latin','Afro',
  'Ballad','Blues','Waltz','Samba','Bossa','Mambo','Cha-Cha','Rumba','Tango','Foxtrot',
  'Improvisation','Cadenza','Coda','Interlude','Prelude','Postlude','Theme','Variation',
  'Quartet','Quintet','Sextet','Septet','Octet','Nonet','Big Band','Combo','Trio','Duo',
  'Serenade','Nocturne','Rhapsody','Fantasia','Caprice','Etude','Sonata','Suite','Concerto',
  'Misty','Round Midnight','Autumn Leaves','Blue in Green','So What','All Blues',
  'Summertime','My Favorite Things','A Love Supreme','Giant Steps','Naima','Impressions',
];

// Classical
const CLASSICAL_FIRST = [
  'Ludwig','Wolfgang','Johann','Franz','Frédéric','Claude','Igor','Sergei','Pyotr','Gustav',
  'Richard','Johannes','Antonio','George','Henry','Benjamin','Aaron','Leonard','Philip','John',
  'Dmitri','Béla','Zoltán','Carl','Felix','Robert','Clara','Fanny','Amy','Cecile',
  'Hildegard','Barbara','Sofia','Arvo','Henryk','Witold','Krzysztof','Olivier','Pierre','Karlheinz',
];
const CLASSICAL_LAST = [
  'van Beethoven','Amadeus Mozart','Sebastian Bach','Schubert','Chopin','Debussy','Stravinsky','Rachmaninoff','Tchaikovsky','Mahler',
  'Wagner','Brahms','Vivaldi','Handel','Purcell','Britten','Copland','Bernstein','Glass','Adams',
  'Shostakovich','Bartók','Kodály','Nielsen','Mendelssohn','Schumann','Schumann','Hensel','Beach','Chaminade',
  'von Bingen','Strozzi','Gubaidulina','Pärt','Górecki','Lutosławski','Penderecki','Messiaen','Boulez','Stockhausen',
];
const CLASSICAL_TITLE_WORDS = [
  'Symphony','Concerto','Sonata','Suite','Overture','Prelude','Fugue','Toccata','Fantasia','Rhapsody',
  'Nocturne','Étude','Waltz','Mazurka','Polonaise','Ballade','Impromptu','Scherzo','Rondo','Minuet',
  'Quartet','Quintet','Trio','Duo','Serenade','Divertimento','Partita','Passacaglia','Chaconne','Variations',
  'Mass','Requiem','Oratorio','Cantata','Motet','Madrigal','Lied','Aria','Recitative','Chorus',
  'Allegro','Andante','Adagio','Presto','Vivace','Moderato','Largo','Lento','Grave','Sostenuto',
  'Major','Minor','Flat','Sharp','Natural','Diminished','Augmented','Dominant','Tonic','Subdominant',
];

// EDM / Electronic
const EDM_FIRST = [
  'Martin','Avicii','Calvin','David','Skrillex','Deadmau5','Tiësto','Armin','Paul','Ferry',
  'Daft','Aphex','Boards','Chemical','Prodigy','Underworld','Orbital','Massive','Portishead','Massive',
  'Diplo','Marshmello','Kygo','Zedd','Illenium','Odesza','Flume','Disclosure','Caribou','Four',
  'Bicep','Jon','Peggy','Floating','Jon','Objekt','Blawan','Surgeon','Regis','Ancient',
  'Aphex','Autechre','Squarepusher','Venetian','Arca','Oneohtrix','Holly','Actress','Burial','Andy',
];
const EDM_LAST = [
  'Garrix','Tim Berg','Harris','Guetta','Sonny Moore','5','Verwest','van Buuren','van Dyk','Corsten',
  'Punk','Twin','of Canada','Brothers','The','','','Attack','','Attack',
  'Thomas','','','','','','','','','Tet',
  '','Hopkins','Gou','Points','','','','','','Methods',
  'Twin','','Pusher','Snacks','','Point Never','Hernandez','','','Weatherall',
];
const EDM_TITLE_WORDS = [
  'Drop','Build','Break','Kick','Snare','Hi-Hat','Bassline','Synth','Arp','Pad',
  'Filter','Cutoff','Resonance','Envelope','LFO','Oscillator','Waveform','Frequency','Amplitude','Phase',
  'Rave','Club','Festival','Stage','Mainstage','Afterparty','Sunrise Set','Closing Set',
  'Euphoria','Ecstasy','Bliss','Transcendence','Elevation','Ascension','Rapture','Nirvana',
  'Techno','House','Trance','Drum & Bass','Jungle','Garage','Dubstep','Grime','Ambient','Drone',
  'BPM','Tempo','Groove','Swing','Shuffle','Quantize','Sync','Trigger','Gate','Sequence',
  'Neon','Laser','Strobe','Fog','Smoke','Mirror Ball','Disco Ball','UV','Blacklight',
  'Warehouse','Fabric','Berghain','Tresor','Panorama Bar','Rex Club','Fabric','Ministry','Egg',
];

// Afrobeats
const AFROBEATS_FIRST = [
  'Burna','Wizkid','Davido','Tiwa','Yemi','Mr','Olamide','Adekunle','Fireboy','Rema',
  'Tems','Omah','Kizz','Patoranking','Flavour','Phyno','Kcee','Tekno','Runtown','Korede',
  'Fela','Femi','Seun','Tony','King','Lagbaja','Onyeka','Asa','Simi','Waje',
  'Sauti','Nyashinski','Khaligraph','Bien','Nviiri','Bensoul','Jovial','Otile','Nandy','Diamond',
  'Harmonize','Rayvanny','Mbosso','Zuchu','Jux','Vanessa','Alikiba','Barnaba','Maua','Lava',
];
const AFROBEATS_LAST = [
  'Boy','Starboy','OBO','Savage','Alade','Eazi','','Gold','DML','',
  '','Lay','Daniel','','','','','','','Bello',
  'Kuti','Kuti','Kuti','Allen','Sunny Ade','','Onwenu','','','',
  'Sol','','Jones','','the storyteller','','','Brown','','Platnumz',
  '','','','','','Mdee','','','Flores','Lava',
];
const AFROBEATS_TITLE_WORDS = [
  'Jollof','Suya','Pepper Soup','Egusi','Puff Puff','Chin Chin','Akara','Moi Moi',
  'Lagos','Accra','Nairobi','Dar es Salaam','Kampala','Abuja','Kigali','Addis Ababa',
  'Afrobeats','Afropop','Afrofusion','Afrojuju','Afroswing','Afrotrap','Afrohouse',
  'Juju','Highlife','Fuji','Apala','Sakara','Waka','Makossa','Soukous','Ndombolo',
  'Shaku Shaku','Zanku','Legwork','Skelewu','Azonto','Alkayida','Gwara Gwara',
  'Naija','Bongo','Kwaito','Gqom','Amapiano','Maskandi','Mbaqanga','Isicathamiya',
  'Love','Dance','Party','Night','Sun','Rain','River','Ocean','Mountain','Sky',
  'Beautiful','Wonderful','Amazing','Fantastic','Incredible','Unbelievable','Extraordinary',
];

// Country
const COUNTRY_FIRST = [
  'Johnny','Dolly','Willie','Waylon','Merle','Hank','Loretta','Tammy','George','Conway',
  'Kenny','Glen','Crystal','Barbara','Reba','Garth','Alan','Vince','Brooks','Clint',
  'Tim','Faith','Shania','Trisha','Martina','Lee','Toby','Brad','Dierks','Jason',
  'Luke','Blake','Miranda','Carrie','Taylor','Kacey','Maren','Kelsea','Ashley','Carly',
  'Chris','Eric','Darius','Zac','Florida','Old','Little','Midland','Lainey','Cody',
];
const COUNTRY_LAST = [
  'Cash','Parton','Nelson','Jennings','Haggard','Williams','Lynn','Wynette','Jones','Twitty',
  'Rogers','Campbell','Gayle','Mandrell','McEntire','Brooks','Jackson','Gill','Dunn','Black',
  'McGraw','Hill','Twain','Yearwood','McBride','Ann Womack','Keith','Paisley','Bentley','Aldean',
  'Bryan','Shelton','Lambert','Underwood','Swift','Musgraves','Morris','Ballerini','McBryde','Pearce',
  'Stapleton','Church','Rucker','Brown','Georgia Line','Dominion','Big Town','','Wilson','Johnson',
];
const COUNTRY_TITLE_WORDS = [
  'Truck','Boots','Hat','Belt Buckle','Wranglers','Flannel','Denim','Leather','Spurs','Lasso',
  'Barn','Farm','Ranch','Field','Pasture','Meadow','Prairie','Plains','Hills','Mountains',
  'Pickup','Tractor','Combine','Plow','Harvest','Crop','Cattle','Horse','Dog','Cat',
  'Whiskey','Beer','Wine','Moonshine','Sweet Tea','Lemonade','Iced Tea','Coffee','Biscuits','Gravy',
  'Heartbreak','Heartache','Heartland','Hometown','Home','Family','Friends','Neighbors','Community',
  'Dirt Road','Gravel Road','Country Road','Highway','Interstate','Backroad','Shortcut',
  'Sunset','Sunrise','Twilight','Dusk','Dawn','Noon','Midnight','Evening','Morning','Afternoon',
  'Summer','Fall','Winter','Spring','Rain','Snow','Sun','Wind','Storm','Thunder',
];

// Blues
const BLUES_FIRST = [
  'Robert','Muddy','Howlin','B.B.','Albert','Freddie','Buddy','John Lee','Elmore','Sonny Boy',
  'Little Walter','Junior','Lightnin','Blind','Son','Mississippi','Tampa','Leadbelly','Big Bill','Charley',
  'Stevie Ray','Eric','Gary','Bonnie','Koko','Etta','Bessie','Ma','Alberta','Victoria',
  'Taj','John','Otis','Albert','Magic','Slim','Pinetop','Booker T.','Little Milton','Bobby',
];
const BLUES_LAST = [
  'Johnson','Waters','Wolf','King','King','King','Guy','Hooker','James','Williamson',
  'Jacobs','Wells','Hopkins','Lemon Jefferson','House','John Hurt','Red','','Broonzy','Patton',
  'Vaughan','Clapton','Moore','Raitt','Taylor','James','Smith','Rainey','Hunter','Spivey',
  'Mahal','Hammond','Rush','Collins','Sam','Harpo','Perkins','Jones','','Blue',
];
const BLUES_TITLE_WORDS = [
  'Blues','Boogie','Shuffle','Stomp','Rag','Juke','Jive','Swing','Jump','Strut',
  'Delta','Chicago','Texas','Mississippi','Louisiana','Memphis','Kansas City','St. Louis','Detroit','New Orleans',
  'Crossroads','Highway','Railroad','Levee','Cotton Field','Plantation','Juke Joint','Honky Tonk',
  'Whiskey','Gin','Bourbon','Moonshine','Corn Liquor','Rotgut','Hooch','Firewater',
  'Heartbreak','Lonesome','Loneliness','Sadness','Sorrow','Grief','Pain','Suffering','Misery','Woe',
  'Woman','Man','Baby','Honey','Sugar','Darling','Sweetheart','Lover','Cheater','Liar',
  'Mojo','Hoodoo','Voodoo','Conjure','Hex','Curse','Spell','Charm','Luck','Fortune',
];

// Soul / R&B
const SOUL_FIRST = [
  'Aretha','Marvin','Stevie','James','Ray','Sam','Otis','Wilson','Al','Curtis',
  'Smokey','Diana','Gladys','Patti','Chaka','Anita','Whitney','Tina','Ike','Sly',
  'Michael','Janet','Prince','Rick','Luther','Teddy','Lionel','Peabo','Jeffrey','Freddie',
  'Mary J.','Erykah','D\'Angelo','Maxwell','Lauryn','Jill','Alicia','John','Usher','R.',
  'Beyoncé','Rihanna','Ciara','Keyshia','Fantasia','Jennifer','Jazmine','Ledisi','Lalah','Angie',
];
const SOUL_LAST = [
  'Franklin','Gaye','Wonder','Brown','Charles','Cooke','Redding','Pickett','Green','Mayfield',
  'Robinson','Ross','Knight','LaBelle','Khan','Baker','Houston','Turner','Turner','Stone',
  'Jackson','Jackson','','James','Vandross','Pendergrass','Richie','Bryson','Osborne','Jackson',
  'Blige','Badu','','Maxwell','Hill','Scott','Keys','Legend','','Kelly',
  'Knowles','Fenty','','Cole','Barrino','Hudson','Sullivan','','Hathaway','Stone',
];
const SOUL_TITLE_WORDS = [
  'Love','Heart','Soul','Spirit','Feeling','Emotion','Passion','Desire','Longing','Yearning',
  'Respect','Dignity','Pride','Honor','Glory','Grace','Beauty','Strength','Power','Courage',
  'Healing','Redemption','Salvation','Liberation','Freedom','Justice','Equality','Unity','Peace','Hope',
  'Groove','Rhythm','Beat','Melody','Harmony','Chord','Note','Tone','Pitch','Timbre',
  'Midnight','Moonlight','Starlight','Sunlight','Candlelight','Firelight','Neon Light','Spotlight',
  'Tender','Gentle','Soft','Sweet','Warm','Kind','Loving','Caring','Nurturing','Supportive',
];

// Funk
const FUNK_FIRST = [
  'James','George','Sly','Bootsy','Parliament','Funkadelic','Earth Wind','Kool','Ohio','Commodores',
  'Rick','Prince','Cameo','Gap','Zapp','Roger','Midnight Star','Slave','Lakeside','Dazz',
  'Tower of Power','Average White','Meters','Neville','Rebirth','Dirty Dozen','Galactic','Lettuce','Soulive','Medeski',
];
const FUNK_LAST = [
  'Brown','Clinton','Stone','Collins','Funkadelic','Parliament','& Fire','& the Gang','Players','',
  'James','','','Band','','Troutman','','','','Band',
  '','Band','','Brothers','Brass Band','Brass Band','','','Martin & Wood','',
];
const FUNK_TITLE_WORDS = [
  'Funk','Groove','Pocket','Slap','Pop','Pluck','Thump','Bump','Grind','Shake',
  'Get Down','Get Up','Get Funky','Get Loose','Get Wild','Get Crazy','Get Nasty','Get Dirty',
  'Boogie','Boogie Down','Boogie Wonderland','Boogie Oogie Oogie','Boogie Nights','Boogie Man',
  'Jam','Jam Session','Jam Band','Jam Out','Jam On','Jam It','Jam Up','Jam Down',
  'Mothership','Connection','Flashlight','One Nation','Tear the Roof','Give Up the Funk',
  'Super Freak','Brick House','Jungle Boogie','Le Freak','Good Times','Rapper\'s Delight',
];

// Metal
const METAL_FIRST = [
  'Black','Iron','Judas','Ozzy','Dio','Ronnie','Rob','Bruce','James','Lars',
  'Kirk','Cliff','Dave','Kerry','Tom','Chuck','Trent','Corey','Jonathan','Phil',
  'Dimebag','Vinnie','Rex','Phil','Zakk','Slash','Axl','Duff','Izzy','Steven',
  'Tony','Geezer','Bill','Ozzy','Ronnie','Ian','Glenn','Rob','K.K.','Dave',
  'Mikael','Peter','Martin','Björn','Brent','Troy','Brann','Bill','Scott','Zach',
];
const METAL_LAST = [
  'Sabbath','Maiden','Priest','Osbourne','Dio','James Dio','Zombie','Dickinson','Hetfield','Ulrich',
  'Hammett','Burton','Mustaine','King','Araya','Schuldiner','Reznor','Taylor','Davis','Anselmo',
  'Darrell','Paul Abbott','Brown','Anselmo','Wylde','Hudson','Rose','McKagan','Stradlin','Adler',
  'Iommi','Butler','Ward','Osbourne','Dio','Gillan','Tipton','Halford','Downing','Murray',
  'Åkerfeldt','Lindgren','Axenrot','Johansson','Hinds','Sanders','Dailor','Kelliher','Henry','Myers',
];
const METAL_TITLE_WORDS = [
  'Death','Doom','Gloom','Darkness','Shadow','Abyss','Void','Chaos','Destruction','Annihilation',
  'Blood','Fire','War','Battle','Conquest','Victory','Defeat','Sacrifice','Ritual','Ceremony',
  'Dragon','Demon','Devil','Satan','Lucifer','Beelzebub','Mephistopheles','Baphomet','Moloch','Belial',
  'Skull','Bone','Grave','Tomb','Crypt','Coffin','Casket','Shroud','Burial','Funeral',
  'Thunder','Lightning','Storm','Tempest','Hurricane','Tornado','Earthquake','Volcano','Tsunami','Avalanche',
  'Iron','Steel','Chrome','Titanium','Tungsten','Cobalt','Nickel','Copper','Bronze','Brass',
  'Riff','Solo','Shred','Sweep','Tap','Pinch','Harmonic','Tremolo','Vibrato','Whammy',
];

// Indie
const INDIE_FIRST = [
  'Arcade','Vampire','Modest','Animal','Neutral','Sufjan','Bon','Fleet','Grizzly','Joanna',
  'Beach','Tame','Mac','Frank','Phoebe','Julien','Soccer','Japanese','Snail','Hovvdy',
  'Big Thief','Adrianne','Hand Habits','Palehound','Waxahatchee','Julien Baker','Lucy','Mitski','Soccer Mommy','Snail Mail',
  'Alex','Clairo','Beabadoobee','Remi','Arlo','Billie','Olivia','Gracie','Lizzy','Maggie',
];
const INDIE_LAST = [
  'Fire','Weekend','Mouse','Collective','Milk Hotel','Stevens','Iver','Foxes','Bear','Newsom',
  'House','Impala','DeMarco','Ocean','Bridgers','Baker','Mommy','Breakfast','Mail','',
  '','Lenker','','','','','Dacus','','','',
  'G','','','Wolf','Parks','Eilish','Rodrigo','Abrams','McAlpine','Rogers',
];
const INDIE_TITLE_WORDS = [
  'Bedroom','Basement','Attic','Garage','Porch','Backyard','Rooftop','Apartment','Studio','Loft',
  'Cassette','Vinyl','CD','MP3','Streaming','Download','Upload','Share','Like','Follow',
  'Feelings','Emotions','Thoughts','Ideas','Dreams','Memories','Regrets','Hopes','Fears','Doubts',
  'Coffee','Tea','Wine','Beer','Cigarette','Joint','Pill','Powder','Liquid','Solid',
  'Bicycle','Skateboard','Scooter','Moped','Motorcycle','Car','Van','Bus','Train','Plane',
  'Sunflower','Daisy','Rose','Lily','Tulip','Orchid','Iris','Violet','Lavender','Jasmine',
  'Soft','Gentle','Quiet','Tender','Delicate','Fragile','Vulnerable','Sensitive','Emotional','Introspective',
];

// Folk
const FOLK_FIRST = [
  'Bob','Joan','Pete','Woody','Joni','Neil','Simon','Paul','Art','James',
  'Carole','Carly','Cat','Gordon','John','Jackson','Crosby','Stills','Nash','Young',
  'Emmylou','Townes','Guy','Steve','Lyle','Nanci','Mary','Iris','Gillian','Lucinda',
  'Fleet','Mumford','Lumineers','Avett','Decemberists','Iron','Punch','Old Crow','Trampled','Watchmen',
];
const FOLK_LAST = [
  'Dylan','Baez','Seeger','Guthrie','Mitchell','Young','& Garfunkel','Simon','Garfunkel','Taylor',
  'King','Simon','Stevens','Lightfoot','Denver','Browne','Stills','Nash','Young','',
  'Harris','Van Zandt','Clark','Earle','Lovett','Griffith','Chapin Carpenter','DeMent','Welch','Williams',
  'Foxes','& Sons','','Brothers','','& Wine','Brothers','Medicine Show','by the Sea','',
];
const FOLK_TITLE_WORDS = [
  'River','Mountain','Valley','Forest','Field','Meadow','Prairie','Plain','Desert','Ocean',
  'Cabin','Cottage','Farmhouse','Barn','Shed','Outhouse','Smokehouse','Springhouse','Icehouse','Smokehouse',
  'Wandering','Traveling','Journeying','Roaming','Drifting','Floating','Sailing','Flying','Walking','Running',
  'Seasons','Harvest','Planting','Growing','Blooming','Fading','Dying','Rebirth','Renewal','Cycle',
  'Ballad','Lament','Dirge','Elegy','Ode','Hymn','Spiritual','Gospel','Prayer','Blessing',
  'Simple','Plain','Honest','True','Real','Genuine','Authentic','Natural','Organic','Pure',
];

// Latin
const LATIN_FIRST = [
  'Marc','Jennifer','Ricky','Gloria','Shakira','Enrique','Pitbull','Daddy','Celia','Tito',
  'Carlos','Santana','Selena','Tejano','Cumbia','Salsa','Merengue','Bachata','Reggaeton','Vallenato',
  'Juan Luis','Romeo','Aventura','Grupo','Los','Las','El','La','Los Bukis','Los Yonics',
  'Maná','Café Tacvba','Molotov','Caifanes','Soda Stereo','Fito','Andrés','Gustavo','Charly','Fito',
];
const LATIN_LAST = [
  'Anthony','Lopez','Martin','Estefan','','Iglesias','','Yankee','Cruz','Puente',
  'Santana','','Quintanilla','','','','','','','',
  'Guerra','Santos','','Noriega','','','','','','',
  '','','','','Stereo','Páez','Calamaro','Cerati','García','Páez',
];
const LATIN_TITLE_WORDS = [
  'Amor','Corazón','Vida','Noche','Día','Sol','Luna','Estrella','Cielo','Mar',
  'Fuego','Agua','Tierra','Aire','Viento','Lluvia','Tormenta','Trueno','Relámpago','Arcoíris',
  'Bailar','Cantar','Reír','Llorar','Soñar','Vivir','Amar','Sentir','Pensar','Recordar',
  'Salsa','Merengue','Cumbia','Bachata','Reggaeton','Vallenato','Tango','Mambo','Cha-Cha','Rumba',
  'Fiesta','Celebración','Alegría','Felicidad','Tristeza','Melancolía','Nostalgia','Añoranza',
  'Familia','Amigos','Vecinos','Comunidad','Pueblo','Ciudad','País','Nación','Mundo','Universo',
];

// Reggae
const REGGAE_FIRST = [
  'Bob','Peter','Bunny','Jimmy','Toots','Burning','Culture','Steel','Third World','Black Uhuru',
  'Ziggy','Damian','Julian','Stephen','Ky-Mani','Rohan','Cedella','Sharon','Rita','Judy',
  'Buju','Beenie','Bounty','Capleton','Sizzla','Luciano','Garnett','Freddie','Dennis','Gregory',
  'Chronixx','Protoje','Kabaka','Jesse','Jah9','Lila','Koffee','Jaz','Sevana','Etana',
];
const REGGAE_LAST = [
  'Marley','Tosh','Wailer','Cliff','& the Maytals','Spear','','Pulse','','',
  'Marley','Marley','Marley','Marley','Marley','Marley','Marley','Marley','Marley','Mowatt',
  'Banton','Man','Killer','','Kalonji','','Silk','McGregor','Brown','Isaacs',
  '','','Pyramid','Royal','','Ike','','Layne','','',
];
const REGGAE_TITLE_WORDS = [
  'Jah','Rastafari','Zion','Babylon','Exodus','Redemption','Liberation','Freedom','Justice','Peace',
  'Roots','Culture','Conscious','Positive','Upliftment','Inspiration','Motivation','Encouragement',
  'One Love','One Heart','One People','One World','One God','One Life','One Way','One Truth',
  'Herb','Ganja','Chalice','Spliff','Ital','Livity','Overstanding','Innerstanding','Outerstanding',
  'Riddim','Skank','Rock Steady','Rocksteady','Ska','Dancehall','Dub','Steppers','Roots Rock',
  'Kingston','Trenchtown','Waterhouse','Arnett Gardens','Tivoli','Spanish Town','Portmore','Montego Bay',
];

// Gospel
const GOSPEL_FIRST = [
  'Kirk','Donnie','Fred Hammond','Hezekiah','Tye','Marvin','Yolanda','CeCe','BeBe','Shirley',
  'Mahalia','Thomas','Edwin','James','Andraé','Walter','Richard','Andraé','Edwin','James',
  'Tamela','Erica','Tasha','Kierra','Jekalyn','Koryn','Tori','Chandler','Maverick City','Elevation',
  'Hillsong','Bethel','Jesus Culture','Passion','Planetshakers','Vineyard','Integrity','Hosanna','Maranatha','Sparrow',
];
const GOSPEL_LAST = [
  'Franklin','McClurkin','','Walker','Tribbett','Sapp','Adams','Winans','Winans','Caesar',
  'Jackson','Dorsey','Hawkins','Cleveland','Crouch','Hawkins','Smallwood','Crouch','Hawkins','Cleveland',
  'Mann','Campbell','Cobbs','Sheard','Carr','Hawthorne','Kelly','Moore','Music','Worship',
  'United','Music','','','','','Music','Music','Music','Records',
];
const GOSPEL_TITLE_WORDS = [
  'Praise','Worship','Glory','Honor','Hallelujah','Amen','Alleluia','Hosanna','Maranatha','Shalom',
  'Grace','Mercy','Love','Faith','Hope','Joy','Peace','Patience','Kindness','Goodness',
  'Salvation','Redemption','Liberation','Deliverance','Healing','Restoration','Renewal','Revival','Awakening',
  'Holy','Sacred','Divine','Heavenly','Celestial','Eternal','Infinite','Almighty','Sovereign','Omnipotent',
  'Blessing','Favor','Anointing','Unction','Presence','Glory','Power','Might','Strength','Courage',
  'Testimony','Witness','Confession','Declaration','Proclamation','Announcement','Revelation','Vision','Dream','Prophecy',
];

// Trap
const TRAP_FIRST = [
  'Gucci','Young','Lil','Future','21','Migos','Rae','Kodak','Lil Yachty','Playboi',
  'Offset','Quavo','Takeoff','Travis','Post','Cardi','Nicki','Doja','Roddy','Polo',
  'Gunna','Lil Baby','Lil Durk','NBA','Dababy','Moneybagg','Mozzy','Blueface','Lil Tjay','Polo',
  'Lil Keed','Lil Gotit','Lil Loaded','Lil Mosey','Lil Tecca','Lil Skies','Lil Pump','Lil Xan',
];
const TRAP_LAST = [
  'Mane','Thug','Uzi Vert','Hendrix','Savage','Sremmurd','Sremmurd','Black','Carti','Carti',
  'Offset','Quavo','Takeoff','Scott','Malone','B','Minaj','Cat','Ricch','G',
  'Gunna','Baby','Durk','YoungBoy','DaBaby','Yo','','','','G',
  'Keed','Gotit','Loaded','Mosey','Tecca','Skies','Pump','Xan',
];
const TRAP_TITLE_WORDS = [
  'Drip','Sauce','Flex','Bag','Bands','Racks','Stacks','Bread','Cheese','Guap',
  'Trap','Plug','Connect','Serve','Move','Flip','Hustle','Grind','Stack','Save',
  'Ice','Froze','Frozen','Iced Out','Dripped Out','Draped Up','Swanged Out','Sauced Up',
  'Bando','Trap House','Spot','Block','Corner','Strip','Avenue','Boulevard','Street','Road',
  'Lean','Wock','Dirty Sprite','Purple Drank','Sizzurp','Codeine','Xan','Perc','Molly','Addy',
  'Opps','Ops','Enemies','Haters','Snakes','Rats','Snitches','Informants','Feds','Police',
];

// Dancehall
const DANCEHALL_FIRST = [
  'Vybz','Alkaline','Popcaan','Mavado','Busy','Bounty','Beenie','Elephant','Shabba','Super Cat',
  'Buju','Capleton','Sizzla','Luciano','Garnett','Freddie','Dennis','Gregory','Chronixx','Protoje',
  'Aidonia','Masicka','Rygin King','Skillibeng','Squash','Teejay','Valiant','Chronic Law','Shenseea','Spice',
];
const DANCEHALL_LAST = [
  'Kartel','','','','Signal','Killer','Man','Man','Ranks','Cat',
  'Banton','','Kalonji','','Silk','McGregor','Brown','Isaacs','','',
  '','','','','','','','','','',
];
const DANCEHALL_TITLE_WORDS = [
  'Dutty','Wuk','Wine','Bubble','Grind','Daggering','Bruk Out','Mash Up','Tear Down','Buss',
  'Gyal','Man','Badman','Gangsta','Rude Boy','Yardie','Shotta','Don','Boss','General',
  'Ting','Vibes','Energy','Frequency','Wavelength','Vibration','Resonance','Harmony','Melody','Rhythm',
  'Bashment','Session','Dance','Party','Fete','Carnival','Festival','Celebration','Jubilee','Jamboree',
  'Kingston','Portmore','Spanish Town','Montego Bay','Ocho Rios','Negril','Mandeville','May Pen',
];

// Synthwave / Vaporwave
const SYNTHWAVE_FIRST = [
  'Kavinsky','Perturbator','Carpenter','Gunship','Lazerhawk','Dynatron','Waveshaper','Nightcrawler','Mega Drive','FM-84',
  'Timecop1983','Futurecop!','Mitch Murder','Betamaxx','Makeup and Vanity Set','Gost','Perturbator','Dance With the Dead',
  'Macintosh Plus','Blank Banshee','Luxury Elite','Saint Pepsi','Skylar Spence','Nmesh','猫 シ Corp.','Vektroid',
];
const SYNTHWAVE_LAST = [
  '','','Brut','','','','','','','',
  '','','','','','','','',
  '','','','','','','','',
];
const SYNTHWAVE_TITLE_WORDS = [
  'Neon','Retro','Outrun','Retrowave','Synthwave','Vaporwave','Dreamwave','Darksynth','Cyberpunk','Futurism',
  '1984','1985','1986','1987','1988','1989','1990','1991','1992','1993',
  'VHS','Cassette','Betamax','LaserDisc','CRT','Cathode Ray','Pixel','Sprite','Bitmap','Vector',
  'Arcade','Atari','Commodore','Amiga','DOS','Windows 95','Macintosh','Apple II','TRS-80','ZX Spectrum',
  'Sunset','Sunrise','Twilight','Dusk','Dawn','Midnight','Noon','Evening','Morning','Afternoon',
  'City','Metropolis','Megalopolis','Megacity','Cybercity','Neon City','Night City','Future City',
];

// Chillhop / Lo-Fi
const LOFI_FIRST = [
  'Nujabes','J Dilla','Madlib','Flying Lotus','Knxwledge','Sango','Kaytranada','Mndsgn','Dibia$e','Jonwayne',
  'Tomppabeats','Idealism','Philanthrope','Kupla','Jinsang','Sleepy Fish','Potsu','Sagun','Aso','Elijah Who',
  'Chillhop','Lofi Hip Hop','Study Beats','Chill Beats','Relaxing Beats','Calm Beats','Peaceful Beats',
];
const LOFI_LAST = [
  '','','','','','','','','','',
  '','','','','','','','','','',
  'Music','Records','Beats','Vibes','Sounds','Sessions','Recordings','Archives','Collections','Volumes',
];
const LOFI_TITLE_WORDS = [
  'Study','Focus','Concentrate','Learn','Read','Write','Code','Work','Create','Imagine',
  'Relax','Unwind','Decompress','Destress','Calm Down','Chill Out','Mellow Out','Ease Up','Slow Down',
  'Rain','Drizzle','Shower','Storm','Thunder','Lightning','Fog','Mist','Haze','Cloud',
  'Coffee','Tea','Cocoa','Milk','Honey','Sugar','Cream','Butter','Toast','Cereal',
  'Morning','Afternoon','Evening','Night','Midnight','Dawn','Dusk','Twilight','Sunrise','Sunset',
  'Bedroom','Apartment','Studio','Loft','Attic','Basement','Garage','Porch','Balcony','Rooftop',
];

// Punk
const PUNK_FIRST = [
  'Sex','Clash','Ramones','Dead','Black','Minor','Bad','Circle','Descendents','Misfits',
  'Buzzcocks','Wire','Gang of Four','Television','Talking','Blondie','Patti','Richard','Tom','Iggy',
  'Green Day','Rancid','NOFX','Pennywise','Bad Religion','Lagwagon','Strung Out','No Use','Propagandhi','Millencolin',
  'Blink','Sum 41','Simple Plan','Good Charlotte','New Found Glory','Taking Back Sunday','Thursday','Saves the Day',
];
const PUNK_LAST = [
  'Pistols','The','','Kennedys','Flag','Threat','Brains','Jerks','','',
  '','','','','Heads','','Smith','Hell','Verlaine','Pop',
  '','','','','','','','for a Name','','',
  '-182','','','','','','','',
];
const PUNK_TITLE_WORDS = [
  'Anarchy','Chaos','Disorder','Rebellion','Revolution','Uprising','Resistance','Defiance','Dissent','Protest',
  'System','Government','Authority','Power','Control','Oppression','Suppression','Repression','Censorship','Propaganda',
  'Punk','Hardcore','Straight Edge','Oi!','Ska Punk','Pop Punk','Post-Punk','New Wave','No Wave','Art Punk',
  'Mohawk','Leather','Studs','Spikes','Chains','Boots','Jeans','T-Shirt','Jacket','Vest',
  'Mosh','Pit','Stage Dive','Crowd Surf','Circle Pit','Wall of Death','Two-Step','Skank','Pogo','Slam',
];

// Grunge
const GRUNGE_FIRST = [
  'Nirvana','Pearl Jam','Soundgarden','Alice in Chains','Mudhoney','Screaming Trees','Dinosaur Jr.','Pixies','Sonic Youth','Husker Du',
  'Kurt','Eddie','Chris','Layne','Mark','Scott','J.','Kim','Thurston','Bob',
  'Dave','Krist','Stone','Jeff','Mike','Jerry','Sean','Matt','Ben','Barrett',
];
const GRUNGE_LAST = [
  '','','','','','','','','','',
  'Cobain','Vedder','Cornell','Staley','Arm','Weiland','Mascis','Deal','Moore','Mould',
  'Grohl','Novoselic','Gossard','Ament','McCready','Cantrell','Kinney','Cameron','Shepherd','Martin',
];
const GRUNGE_TITLE_WORDS = [
  'Smells Like','Come as You Are','Heart-Shaped Box','In Bloom','Lithium','Polly','Territorial Pissings',
  'Even Flow','Alive','Jeremy','Black','Yellow Ledbetter','Better Man','Daughter','Nothingman',
  'Black Hole Sun','Spoonman','Fell on Black Days','Like Suicide','Burden in My Hand',
  'Would?','Rooster','Down in a Hole','Them Bones','Angry Chair','Rain When I Die',
  'Dirty','Grunge','Sludge','Noise','Feedback','Distortion','Fuzz','Overdrive','Saturation','Compression',
  'Seattle','Pacific Northwest','Rain','Gray','Overcast','Cloudy','Foggy','Misty','Damp','Wet',
];

// Ambient
const AMBIENT_FIRST = [
  'Brian','Harold','Tangerine','Klaus','Cluster','Harmonia','Neu!','Can','Faust','Amon Düül',
  'Aphex','Boards','Stars of the Lid','Grouper','William Basinski','Loscil','Tim Hecker','Fennesz','Oval','Alva Noto',
  'Max Richter','Johann Johannsson','Nils Frahm','Ólafur Arnalds','Jóhann Jóhannsson','Hauschka','Dustin O\'Halloran',
];
const AMBIENT_LAST = [
  'Eno','Budd','Dream','Schulze','','','','','','II',
  'Twin','of Canada','','','','','','','','',
  '','','','','','','',
];
const AMBIENT_TITLE_WORDS = [
  'Silence','Stillness','Quietude','Tranquility','Serenity','Calm','Peace','Rest','Repose','Ease',
  'Drone','Tone','Texture','Timbre','Resonance','Reverberation','Echo','Delay','Sustain','Release',
  'Space','Void','Emptiness','Nothingness','Infinity','Eternity','Timelessness','Boundlessness','Limitlessness',
  'Atmosphere','Environment','Landscape','Soundscape','Mindscape','Dreamscape','Innerscape','Outerscape',
  'Meditation','Contemplation','Reflection','Introspection','Mindfulness','Awareness','Presence','Being',
  'Water','Air','Earth','Fire','Ether','Quintessence','Essence','Substance','Matter','Energy',
];

// Disco
const DISCO_FIRST = [
  'Donna','Gloria','Diana','Chic','Bee Gees','KC','Village','Earth Wind','Kool','Sister',
  'Sylvester','Patrick','Thelma','Evelyn','Loleatta','Candi','Staton','Gwen','Freda','Brenda',
  'Giorgio','Cerrone','Patrick','Alec','Moroder','Cerrone','Salsoul','Philadelphia','Prelude','West End',
];
const DISCO_LAST = [
  'Summer','Gaynor','Ross','','','& the Sunshine Band','People','& Fire','& the Gang','Sledge',
  '','Hernandez','Houston','Champagne','Holloway','Staton','','McCrae','Payne','Russell',
  'Moroder','','Cowley','Costandinos','','','Orchestra','International','Records','Records',
];
const DISCO_TITLE_WORDS = [
  'Dance','Boogie','Groove','Hustle','Bump','Shake','Shimmy','Twist','Jive','Swing',
  'Disco','Funk','Soul','R&B','Pop','Rock','Electronic','Synth','Drum Machine','Bass',
  'Mirror Ball','Disco Ball','Strobe Light','Laser','Fog Machine','Smoke Machine','Spotlight','Neon',
  'Studio 54','Paradise Garage','Loft','Warehouse','Club','Discotheque','Nightclub','Ballroom','Dancehall',
  'Saturday Night','Friday Night','Thursday Night','Wednesday Night','Tuesday Night','Monday Night',
  'Fever','Frenzy','Mania','Craze','Trend','Fashion','Style','Vogue','Pose','Strut',
];

// Bluegrass
const BLUEGRASS_FIRST = [
  'Bill','Earl','Lester','Flatt','Doc','Ralph','Carter','Ricky','Alison','Sam',
  'Del','Tony','Bela','Jerry','David','Tim','Rhonda','Gillian','Nickel Creek','Punch Brothers',
];
const BLUEGRASS_LAST = [
  'Monroe','Scruggs','Flatt','& Scruggs','Watson','Stanley','Family','Skaggs','Krauss','Bush',
  'McCoury','Rice','Fleck','Garcia','Grisman','O\'Brien','Vincent','Welch','','',
];
const BLUEGRASS_TITLE_WORDS = [
  'Banjo','Fiddle','Mandolin','Guitar','Dobro','Bass','Upright Bass','Washtub Bass','Jug','Washboard',
  'Mountain','Holler','Hollow','Cove','Gap','Pass','Ridge','Peak','Summit','Valley',
  'Appalachian','Ozark','Blue Ridge','Smoky','Cumberland','Allegheny','Catskill','Adirondack','Berkshire','Green',
  'Moonshine','Corn Liquor','White Lightning','Mountain Dew','Hooch','Firewater','Rotgut','Popskull',
  'Cabin','Shack','Shanty','Hovel','Hut','Lean-to','Dugout','Sod House','Log House','Stone House',
];

// Swing / Big Band
const SWING_FIRST = [
  'Benny','Glenn','Tommy','Jimmy','Count','Duke','Artie','Harry','Cab','Lionel',
  'Woody','Stan','Dizzy','Charlie','Miles','Thelonious','Sonny','Coleman','Lester','Coleman',
];
const SWING_LAST = [
  'Goodman','Miller','Dorsey','Dorsey','Basie','Ellington','Shaw','James','Calloway','Hampton',
  'Herman','Kenton','Gillespie','Parker','Davis','Monk','Rollins','Hawkins','Young','Hawkins',
];
const SWING_TITLE_WORDS = [
  'Swing','Jive','Lindy Hop','East Coast Swing','West Coast Swing','Balboa','Shag','Charleston','Foxtrot','Quickstep',
  'Big Band','Orchestra','Ensemble','Combo','Quartet','Quintet','Sextet','Septet','Octet','Nonet',
  'Ballroom','Dance Hall','Supper Club','Nightclub','Cabaret','Speakeasy','Roadhouse','Honky Tonk',
  'Boogie Woogie','Jump Blues','Kansas City Jazz','New Orleans Jazz','Chicago Jazz','New York Jazz',
];

// Bossa Nova
const BOSSANOVA_FIRST = [
  'João','Antônio','Tom','Vinicius','Astrud','Elis','Gal','Caetano','Gilberto','Chico',
  'Milton','Ivan','Djavan','Ivan','Edu','Marcos','Dori','Roberto','Nara','Maysa',
];
const BOSSANOVA_LAST = [
  'Gilberto','Carlos Jobim','Jobim','de Moraes','Gilberto','Regina','Costa','Veloso','Gil','Buarque',
  'Nascimento','Lins','','Lins','Lobo','Valle','Caymmi','Carlos','Leão','',
];
const BOSSANOVA_TITLE_WORDS = [
  'Garota de Ipanema','Corcovado','Desafinado','Samba de Uma Nota Só','Água de Beber','Insensatez',
  'Chega de Saudade','Meditação','Doralice','Brigas Nunca Mais','Vivo Sonhando','Fotografia',
  'Saudade','Amor','Coração','Vida','Noite','Dia','Sol','Lua','Estrela','Céu','Mar',
  'Rio','São Paulo','Bahia','Minas','Ipanema','Copacabana','Leblon','Barra','Botafogo',
  'Bossa','Nova','Samba','Choro','Baião','Forró','Axé','Pagode','Funk Carioca','Funk Ostentação',
];

// Cumbia / Salsa / Merengue
const CUMBIA_FIRST = [
  'Carlos','Celia','Tito','Marc','Rubén','Willie','Héctor','Cheo','Ismael','Pete',
  'Juan Luis','Romeo','Aventura','Grupo','Los','Las','El','La','Los Bukis','Los Yonics',
  'Carlos Vives','Shakira','Juanes','Maluma','J Balvin','Bad Bunny','Ozuna','Daddy Yankee',
];
const CUMBIA_LAST = [
  'Vives','Cruz','Puente','Anthony','Blades','Colón','Lavoe','Feliciano','Rivera','Rodríguez',
  'Guerra','Santos','','Noriega','','','','','','',
  '','','','','','','','','','',
];
const CUMBIA_TITLE_WORDS = [
  'Cumbia','Salsa','Merengue','Bachata','Vallenato','Porro','Mapalé','Gaita','Bullerengue','Chandé',
  'Cali','Barranquilla','Cartagena','Medellín','Bogotá','Cúcuta','Bucaramanga','Pereira','Manizales','Armenia',
  'Colombia','Venezuela','Ecuador','Perú','Bolivia','Chile','Argentina','Uruguay','Paraguay','Brasil',
  'Acordeón','Caja','Guacharaca','Maracas','Clave','Bongó','Congas','Timbales','Güiro','Cowbell',
];

// Flamenco
const FLAMENCO_FIRST = [
  'Paco','Camarón','Enrique','Manolo','Tomatito','Vicente','Pepe','Niña','Lola','Carmen',
  'Estrella','Rosalía','Niña Pastori','Mayte','Remedios','Fernanda','Bernarda','Manuela','Juana','María',
];
const FLAMENCO_LAST = [
  'de Lucía','de la Isla','Morente','Sanlúcar','','Amigo','Habichuela','de los Peines','Flores','Amaya',
  'Morente','','','Martín','Amaya','de Utrera','de Utrera','Vargas','la Macarrona','Vargas',
];
const FLAMENCO_TITLE_WORDS = [
  'Soleá','Seguiriya','Bulería','Alegrías','Farruca','Tango','Rumba','Zambra','Fandango','Malagueña',
  'Cante','Baile','Toque','Palmas','Pitos','Zapateado','Taconeo','Braceo','Floreos','Vueltas',
  'Duende','Jondo','Puro','Gitano','Andaluz','Flamenco','Arte','Pasión','Emoción','Sentimiento',
  'Sevilla','Granada','Jerez','Cádiz','Córdoba','Málaga','Almería','Huelva','Jaén','Almería',
];

// Drill
const DRILL_FIRST = [
  'Chief Keef','Lil Durk','G Herbo','Polo G','Juice WRLD','Chance','Vic Mensa','Saba','Noname','Mick Jenkins',
  'Pop Smoke','Fivio Foreign','Sheff G','Sleepy Hallow','Kay Flock','Dougie B','Sha Ek','Cardi B',
  'Central Cee','Digga D','Headie One','Unknown T','Russ Millions','Buni','Tion Wayne','Stormzy',
];
const DRILL_LAST = [
  '','','','G','','the Rapper','','','','',
  '','','','','','','','',
  '','','','','','','','',
];
const DRILL_TITLE_WORDS = [
  'Drill','Trap','Grime','Road','Block','Ends','Mandem','Ting','Peng','Bare',
  'Opps','Ops','Enemies','Haters','Snakes','Rats','Snitches','Informants','Feds','Police',
  'Shank','Blade','Knife','Strap','Burner','Piece','Tool','Hammer','Banger','Heater',
  'Trap House','Spot','Block','Corner','Strip','Avenue','Boulevard','Street','Road','Alley',
  'Chicago','Brooklyn','Bronx','Harlem','Compton','Watts','South Central','East Side','West Side','North Side',
  'London','Birmingham','Manchester','Liverpool','Leeds','Sheffield','Bristol','Glasgow','Edinburgh','Cardiff',
];

// Grime
const GRIME_FIRST = [
  'Dizzee','Wiley','Skepta','JME','Stormzy','Giggs','Ghetts','Kano','Tinchy','Tinie',
  'Lethal Bizzle','Jammer','Riko Dan','Flowdan','Trim','Bruza','Bashy','Sway','Wretch 32','Chipmunk',
];
const GRIME_LAST = [
  'Rascal','','','','','','','','Stryder','Tempah',
  '','','','','','','','','','',
];
const GRIME_TITLE_WORDS = [
  'Grime','Garage','UK','London','East London','South London','North London','West London','Ends','Mandem',
  'Ting','Peng','Bare','Sick','Wicked','Nang','Buff','Piff','Dank','Leng',
  'Roadman','Badman','Gangsta','Rude Boy','Yardie','Shotta','Don','Boss','General','Soldier',
  'Spitting','Bars','Flow','Lyrics','Rhymes','Verses','Hooks','Choruses','Bridges','Outros',
];

// Emo
const EMO_FIRST = [
  'My Chemical','Fall Out','Panic!','Dashboard','Taking Back','Thursday','Saves the Day','Brand New','The Used','Hawthorne Heights',
  'Senses Fail','Silverstein','Underoath','Atreyu','Avenged Sevenfold','Bullet for My Valentine','Bring Me the Horizon','Asking Alexandria',
  'Gerard','Pete','Brendon','Chris','Adam','Geoff','Jesse','Jesse','Bert','JT',
];
const EMO_LAST = [
  'Romance','Boy','at the Disco','Confessional','Sunday','','','','','',
  '','','','','Sevenfold','','','',
  'Way','Wentz','Urie','Carrabba','Lazzara','Rickly','Lacey','Lacey','McCracken','Woodard',
];
const EMO_TITLE_WORDS = [
  'Broken','Shattered','Torn','Ripped','Destroyed','Devastated','Crushed','Defeated','Hopeless','Helpless',
  'Tears','Crying','Weeping','Sobbing','Wailing','Mourning','Grieving','Lamenting','Suffering','Aching',
  'Black','Dark','Gray','Pale','Faded','Washed Out','Bleached','Drained','Empty','Hollow',
  'Scars','Wounds','Bruises','Cuts','Burns','Marks','Traces','Remnants','Echoes','Shadows',
  'Goodbye','Farewell','Adieu','Au Revoir','Auf Wiedersehen','Arrivederci','Sayonara','Ciao','Tschüss','Tchau',
];

// Shoegaze
const SHOEGAZE_FIRST = [
  'My Bloody','Slowdive','Ride','Lush','Chapterhouse','Pale Saints','Moose','Swervedriver','Curve','Adorable',
  'Cocteau Twins','The Jesus and Mary Chain','Mazzy Star','Beach House','Warpaint','Deerhunter','Yo La Tengo','Spiritualized',
];
const SHOEGAZE_LAST = [
  'Valentine','','','','','','','','','',
  '','','','','','','','',
];
const SHOEGAZE_TITLE_WORDS = [
  'Noise','Feedback','Distortion','Fuzz','Overdrive','Saturation','Compression','Reverb','Delay','Echo',
  'Dreamy','Hazy','Fuzzy','Blurry','Soft','Gentle','Tender','Delicate','Fragile','Ethereal',
  'Shoegaze','Dream Pop','Noise Pop','Indie Rock','Alternative Rock','Post-Rock','Post-Punk','New Wave',
  'Pedal','Effect','Chain','Signal','Path','Route','Journey','Voyage','Expedition','Adventure',
];

// Post-Rock
const POSTROCK_FIRST = [
  'Godspeed You!','Explosions in the Sky','Mogwai','Sigur Rós','Tortoise','Slint','Talk Talk','Bark Psychosis',
  'Mono','Pelican','Russian Circles','Caspian','This Will Destroy You','Hammock','Balmorhea','Yndi Halda',
];
const POSTROCK_LAST = [
  'Black Emperor','','','','','','','',
  '','','','','','','','',
];
const POSTROCK_TITLE_WORDS = [
  'Crescendo','Decrescendo','Build','Release','Tension','Resolution','Climax','Anticlimax','Peak','Valley',
  'Instrumental','Wordless','Speechless','Silent','Quiet','Loud','Soft','Hard','Gentle','Fierce',
  'Epic','Grand','Majestic','Sublime','Transcendent','Overwhelming','Devastating','Beautiful','Terrible','Wonderful',
  'Long','Extended','Drawn Out','Stretched','Expanded','Elongated','Prolonged','Sustained','Maintained','Continued',
];

// House
const HOUSE_FIRST = [
  'Frankie','Larry','Ron','Marshall','Derrick','Kevin','Juan','Robert','Kerri','Frankie',
  'Daft','Basement Jaxx','Armand Van','Chemical Brothers','Fatboy Slim','Moby','Leftfield','Underworld','Orbital','Prodigy',
  'Disclosure','Duke Dumont','Route 94','Gorgon City','Bondax','Kidnap Kid','Julio Bashmore','Breach','Huxley','Skream',
];
const HOUSE_LAST = [
  'Knuckles','Heard','Hardy','Jefferson','May','Saunderson','Atkins','Hood','Chandler','Bones',
  'Punk','','Helden','','Slim','','','','','',
  '','','','','','','','','','',
];
const HOUSE_TITLE_WORDS = [
  'House','Deep House','Tech House','Progressive House','Electro House','Funky House','Soulful House','Vocal House',
  'Chicago','Detroit','New York','London','Berlin','Amsterdam','Ibiza','Barcelona','Paris','Tokyo',
  'Groove','Pocket','Swing','Shuffle','Bounce','Pump','Drive','Push','Pull','Flow',
  'Piano','Organ','Strings','Brass','Woodwind','Percussion','Drums','Bass','Synth','Pad',
  'Diva','Vocalist','Singer','MC','Rapper','Poet','Spoken Word','Chant','Mantra','Prayer',
];

// Drum & Bass
const DNB_FIRST = [
  'Goldie','LTJ Bukem','Roni Size','Grooverider','Fabio','DJ Hype','Andy C','Pendulum','Chase & Status','Noisia',
  'Shy FX','Congo Natty','Dillinja','Optical','Ed Rush','Photek','Source Direct','Metalheadz','Moving Shadow','Reinforced',
];
const DNB_LAST = [
  '','','','','','','','','','',
  '','','','','','','','','','',
];
const DNB_TITLE_WORDS = [
  'Drum & Bass','Jungle','Breakbeat','Amen Break','Reese Bass','Neurofunk','Liquid Funk','Jump Up','Darkstep','Techstep',
  'BPM','Tempo','Groove','Swing','Shuffle','Quantize','Sync','Trigger','Gate','Sequence',
  'Rave','Club','Festival','Stage','Mainstage','Afterparty','Sunrise Set','Closing Set',
  'Euphoria','Ecstasy','Bliss','Transcendence','Elevation','Ascension','Rapture','Nirvana',
];

// J-Pop
const JPOP_FIRST = [
  'Hikaru','Ayumi','Namie','Kumi','Perfume','AKB48','Morning Musume','SMAP','Arashi','Exile',
  'Utada','Hamasaki','Amuro','Koda','','','','','','',
  'Kenshi','Kenshi Yonezu','Aimyon','Official HIGE DANdism','King Gnu','Yorushika','YOASOBI','Eve','Vaundy','Fujii Kaze',
];
const JPOP_LAST = [
  'Utada','Hamasaki','Amuro','Koda','','','','','','',
  '','','','','','','','','','',
  'Yonezu','','','','','','','','','',
];
const JPOP_TITLE_WORDS = [
  'Hikari','Yume','Ai','Kokoro','Hana','Sora','Umi','Kaze','Hoshi','Tsuki',
  'Natsu','Fuyu','Haru','Aki','Ame','Yuki','Taiyou','Kumo','Niji','Kaminari',
  'Koi','Namida','Egao','Kibou','Yume','Mirai','Kako','Ima','Toki','Kioku',
  'Kawaii','Sugoi','Yabai','Suki','Daisuki','Aishiteru','Arigatou','Gomen','Sayonara','Mata ne',
  'Idol','Anime','Manga','Otaku','Kawaii','Moe','Tsundere','Yandere','Kuudere','Dandere',
];

// Neo-Soul
const NEOSOUL_FIRST = [
  'Erykah','D\'Angelo','Maxwell','Lauryn','Jill','Alicia','John','Musiq','Anthony','Bilal',
  'Ledisi','Lalah','Angie','Raheem','Dwele','Algebra','Kindred','Floetry','Fertile Ground','Res',
  'Frank','The Weeknd','Miguel','Jhené','SZA','H.E.R.','Ella Mai','Snoh Aalegra','Syd','Ravyn Lenae',
];
const NEOSOUL_LAST = [
  'Badu','','Maxwell','Hill','Scott','Keys','Legend','Soulchild','Hamilton','',
  '','Hathaway','Stone','DeVaughn','','Blessett','the Family Soul','','','',
  'Ocean','','','Aiko','','','','','','',
];
const NEOSOUL_TITLE_WORDS = [
  'Soul','Groove','Vibe','Feel','Emotion','Passion','Desire','Longing','Yearning','Craving',
  'Healing','Restoration','Renewal','Revival','Awakening','Transformation','Evolution','Growth','Development','Progress',
  'Love','Heart','Mind','Body','Spirit','Soul','Essence','Core','Center','Foundation',
  'Smooth','Silky','Velvety','Buttery','Creamy','Rich','Deep','Full','Round','Warm',
  'Acoustic','Electric','Organic','Natural','Raw','Unprocessed','Unfiltered','Unedited','Unmastered','Unmixed',
];

// ── Combined genre-specific pools ─────────────────────────────────────────────
interface GenrePool {
  firstNames: string[];
  lastNames: string[];
  titleWords: string[];
}

const GENRE_POOLS: Record<string, GenrePool> = {
  'K-Pop': { firstNames: KPOP_FIRST, lastNames: KPOP_LAST, titleWords: KPOP_TITLE_WORDS },
  'Hip-Hop': { firstNames: HIPHOP_FIRST, lastNames: HIPHOP_LAST, titleWords: HIPHOP_TITLE_WORDS },
  'Reggaeton': { firstNames: REGGAETON_FIRST, lastNames: REGGAETON_LAST, titleWords: REGGAETON_TITLE_WORDS },
  'Jazz': { firstNames: JAZZ_FIRST, lastNames: JAZZ_LAST, titleWords: JAZZ_TITLE_WORDS },
  'Classical': { firstNames: CLASSICAL_FIRST, lastNames: CLASSICAL_LAST, titleWords: CLASSICAL_TITLE_WORDS },
  'Electronic': { firstNames: EDM_FIRST, lastNames: EDM_LAST, titleWords: EDM_TITLE_WORDS },
  'EDM': { firstNames: EDM_FIRST, lastNames: EDM_LAST, titleWords: EDM_TITLE_WORDS },
  'Afrobeats': { firstNames: AFROBEATS_FIRST, lastNames: AFROBEATS_LAST, titleWords: AFROBEATS_TITLE_WORDS },
  'Country': { firstNames: COUNTRY_FIRST, lastNames: COUNTRY_LAST, titleWords: COUNTRY_TITLE_WORDS },
  'Blues': { firstNames: BLUES_FIRST, lastNames: BLUES_LAST, titleWords: BLUES_TITLE_WORDS },
  'Soul': { firstNames: SOUL_FIRST, lastNames: SOUL_LAST, titleWords: SOUL_TITLE_WORDS },
  'R&B': { firstNames: SOUL_FIRST, lastNames: SOUL_LAST, titleWords: SOUL_TITLE_WORDS },
  'Funk': { firstNames: FUNK_FIRST, lastNames: FUNK_LAST, titleWords: FUNK_TITLE_WORDS },
  'Metal': { firstNames: METAL_FIRST, lastNames: METAL_LAST, titleWords: METAL_TITLE_WORDS },
  'Indie': { firstNames: INDIE_FIRST, lastNames: INDIE_LAST, titleWords: INDIE_TITLE_WORDS },
  'Folk': { firstNames: FOLK_FIRST, lastNames: FOLK_LAST, titleWords: FOLK_TITLE_WORDS },
  'Latin': { firstNames: LATIN_FIRST, lastNames: LATIN_LAST, titleWords: LATIN_TITLE_WORDS },
  'Reggae': { firstNames: REGGAE_FIRST, lastNames: REGGAE_LAST, titleWords: REGGAE_TITLE_WORDS },
  'Gospel': { firstNames: GOSPEL_FIRST, lastNames: GOSPEL_LAST, titleWords: GOSPEL_TITLE_WORDS },
  'Trap': { firstNames: TRAP_FIRST, lastNames: TRAP_LAST, titleWords: TRAP_TITLE_WORDS },
  'Dancehall': { firstNames: DANCEHALL_FIRST, lastNames: DANCEHALL_LAST, titleWords: DANCEHALL_TITLE_WORDS },
  'Synthwave': { firstNames: SYNTHWAVE_FIRST, lastNames: SYNTHWAVE_LAST, titleWords: SYNTHWAVE_TITLE_WORDS },
  'Vaporwave': { firstNames: SYNTHWAVE_FIRST, lastNames: SYNTHWAVE_LAST, titleWords: SYNTHWAVE_TITLE_WORDS },
  'Lo-Fi': { firstNames: LOFI_FIRST, lastNames: LOFI_LAST, titleWords: LOFI_TITLE_WORDS },
  'Chillhop': { firstNames: LOFI_FIRST, lastNames: LOFI_LAST, titleWords: LOFI_TITLE_WORDS },
  'Punk': { firstNames: PUNK_FIRST, lastNames: PUNK_LAST, titleWords: PUNK_TITLE_WORDS },
  'Grunge': { firstNames: GRUNGE_FIRST, lastNames: GRUNGE_LAST, titleWords: GRUNGE_TITLE_WORDS },
  'Ambient': { firstNames: AMBIENT_FIRST, lastNames: AMBIENT_LAST, titleWords: AMBIENT_TITLE_WORDS },
  'Disco': { firstNames: DISCO_FIRST, lastNames: DISCO_LAST, titleWords: DISCO_TITLE_WORDS },
  'Bluegrass': { firstNames: BLUEGRASS_FIRST, lastNames: BLUEGRASS_LAST, titleWords: BLUEGRASS_TITLE_WORDS },
  'Swing': { firstNames: SWING_FIRST, lastNames: SWING_LAST, titleWords: SWING_TITLE_WORDS },
  'Bebop': { firstNames: JAZZ_FIRST, lastNames: JAZZ_LAST, titleWords: JAZZ_TITLE_WORDS },
  'Bossa Nova': { firstNames: BOSSANOVA_FIRST, lastNames: BOSSANOVA_LAST, titleWords: BOSSANOVA_TITLE_WORDS },
  'Cumbia': { firstNames: CUMBIA_FIRST, lastNames: CUMBIA_LAST, titleWords: CUMBIA_TITLE_WORDS },
  'Salsa': { firstNames: CUMBIA_FIRST, lastNames: CUMBIA_LAST, titleWords: CUMBIA_TITLE_WORDS },
  'Merengue': { firstNames: CUMBIA_FIRST, lastNames: CUMBIA_LAST, titleWords: CUMBIA_TITLE_WORDS },
  'Bachata': { firstNames: CUMBIA_FIRST, lastNames: CUMBIA_LAST, titleWords: CUMBIA_TITLE_WORDS },
  'Samba': { firstNames: BOSSANOVA_FIRST, lastNames: BOSSANOVA_LAST, titleWords: BOSSANOVA_TITLE_WORDS },
  'Flamenco': { firstNames: FLAMENCO_FIRST, lastNames: FLAMENCO_LAST, titleWords: FLAMENCO_TITLE_WORDS },
  'Drill': { firstNames: DRILL_FIRST, lastNames: DRILL_LAST, titleWords: DRILL_TITLE_WORDS },
  'Grime': { firstNames: GRIME_FIRST, lastNames: GRIME_LAST, titleWords: GRIME_TITLE_WORDS },
  'Emo': { firstNames: EMO_FIRST, lastNames: EMO_LAST, titleWords: EMO_TITLE_WORDS },
  'Shoegaze': { firstNames: SHOEGAZE_FIRST, lastNames: SHOEGAZE_LAST, titleWords: SHOEGAZE_TITLE_WORDS },
  'Post-Rock': { firstNames: POSTROCK_FIRST, lastNames: POSTROCK_LAST, titleWords: POSTROCK_TITLE_WORDS },
  'House': { firstNames: HOUSE_FIRST, lastNames: HOUSE_LAST, titleWords: HOUSE_TITLE_WORDS },
  'Drum & Bass': { firstNames: DNB_FIRST, lastNames: DNB_LAST, titleWords: DNB_TITLE_WORDS },
  'J-Pop': { firstNames: JPOP_FIRST, lastNames: JPOP_LAST, titleWords: JPOP_TITLE_WORDS },
  'Neo-Soul': { firstNames: NEOSOUL_FIRST, lastNames: NEOSOUL_LAST, titleWords: NEOSOUL_TITLE_WORDS },
};

// ── Generic fallback pools ────────────────────────────────────────────────────
const FIRST_NAMES = [
  'Alex','Jordan','Taylor','Morgan','Casey','Riley','Avery','Quinn','Skyler','Dakota',
  'Reese','Peyton','Hayden','Cameron','Logan','Blake','Drew','Emery','Finley','Harper',
  'Indigo','Jaden','Kendall','Lane','Micah','Noel','Oakley','Parker','Remy','Sage',
  'Tatum','Uma','Vance','Wren','Xander','Yael','Zara','Aiden','Brynn','Cole',
  'Demi','Eli','Faye','Gray','Hana','Ivan','Jade','Kai','Lena','Milo',
  'Nina','Omar','Piper','Rex','Sasha','Theo','Ursa','Vera','Wade','Xena',
  'Yuki','Zion','Aria','Beau','Cleo','Dean','Eden','Felix','Gwen','Hugo',
  'Iris','Joel','Kira','Luca','Maya','Nash','Opal','Penn','Raia','Seth',
  'Tara','Ugo','Vivi','Wolf','Xio','Yara','Zeke','Amos','Bria','Cruz',
  'Dara','Evan','Fern','Glen','Hera','Ines','Juno','Knox','Lyra','Marc',
  'Nora','Otto','Pax','Quin','Rosa','Sven','Tess','Ulan','Vega','Wes',
  'Xyla','Yves','Zola','Abel','Bela','Cian','Dion','Elsa','Ford','Gaia',
  'Hale','Ilia','Jett','Kael','Lior','Mara','Nero','Orin','Prue','Roan',
  'Sora','Tove','Ula','Vito','Wila','Xavi','Yona','Zuri','Ace','Bay',
  'Cove','Dex','Echo','Flint','Gem','Haze','Ike','Jinx','Koda','Lux',
  'Moss','Nix','Onyx','Pine','Quill','Reef','Slate','Tide','Umber','Vale',
  'Wisp','Xero','Yew','Zest','Ash','Birch','Cedar','Dusk','Ember','Frost',
  'Grove','Hawk','Isle','Jade','Knoll','Lake','Mist','Night','Oasis','Peak',
  'Quest','Rain','Storm','Thorn','Umber','Veil','Wind','Xenon','Yarn','Zen',
];

const LAST_NAMES = [
  'Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Wilson','Moore',
  'Taylor','Anderson','Thomas','Jackson','White','Harris','Martin','Thompson','Young','Allen',
  'King','Wright','Scott','Torres','Nguyen','Hill','Flores','Green','Adams','Nelson',
  'Baker','Hall','Rivera','Campbell','Mitchell','Carter','Roberts','Gomez','Phillips','Evans',
  'Turner','Diaz','Parker','Cruz','Edwards','Collins','Reyes','Stewart','Morris','Sanchez',
  'Rogers','Reed','Cook','Morgan','Bell','Murphy','Bailey','Cooper','Richardson','Cox',
  'Howard','Ward','Torres','Peterson','Gray','Ramirez','James','Watson','Brooks','Kelly',
  'Sanders','Price','Bennett','Wood','Barnes','Ross','Henderson','Coleman','Jenkins','Perry',
  'Powell','Long','Patterson','Hughes','Flores','Washington','Butler','Simmons','Foster','Gonzales',
  'Bryant','Alexander','Russell','Griffin','Diaz','Hayes','Myers','Ford','Hamilton','Graham',
  'Sullivan','Wallace','Woods','Cole','West','Jordan','Owens','Reynolds','Fisher','Ellis',
  'Harrison','Gibson','Mcdonald','Cruz','Marshall','Ortiz','Gomez','Murray','Freeman','Wells',
  'Webb','Simpson','Stevens','Tucker','Porter','Hunter','Hicks','Crawford','Henry','Boyd',
  'Mason','Morales','Kennedy','Warren','Dixon','Ramos','Reyes','Burns','Gordon','Shaw',
  'Holmes','Rice','Robertson','Hunt','Black','Daniels','Palmer','Mills','Nichols','Grant',
  'Knight','Ferguson','Rose','Stone','Hawkins','Dunn','Perkins','Hudson','Spencer','Gardner',
  'Stephens','Payne','Pierce','Berry','Matthews','Arnold','Wagner','Willis','Ray','Watkins',
  'Olson','Carroll','Duncan','Snyder','Hart','Cunningham','Bradley','Lane','Andrews','Ruiz',
  'Harper','Fox','Riley','Armstrong','Carpenter','Weaver','Greene','Lawrence','Elliott','Chavez',
  'Sims','Austin','Peters','Kelley','Franklin','Lawson','Fields','Gutierrez','Ryan','Schmidt',
];

const BAND_SUFFIXES = [
  'Band', 'Project', 'Collective', 'Ensemble', 'Orchestra', 'Quartet', 'Trio',
  'Experience', 'Sound', 'Movement', 'Alliance', 'Society', 'Union', 'Crew',
];

const TITLE_WORDS_A = [
  'Midnight', 'Golden', 'Silver', 'Neon', 'Electric', 'Velvet', 'Crystal',
  'Shadow', 'Burning', 'Frozen', 'Broken', 'Rising', 'Falling', 'Dancing',
  'Dreaming', 'Fading', 'Glowing', 'Hidden', 'Lost', 'Wild', 'Sacred',
  'Ancient', 'Modern', 'Digital', 'Analog', 'Cosmic', 'Stellar', 'Lunar',
  'Solar', 'Infinite', 'Eternal', 'Fleeting', 'Distant', 'Hollow', 'Bright',
  'Dark', 'Deep', 'High', 'Low', 'Fast', 'Slow', 'Loud', 'Quiet',
  'Warm', 'Cold', 'Sweet', 'Bitter', 'Strange', 'Beautiful', 'Lonely',
  'Happy', 'Sad', 'Angry', 'Peaceful', 'Restless', 'Fearless', 'Hopeful',
  'Broken', 'Mended', 'Shattered', 'Whole', 'Empty', 'Full', 'Open',
  'Closed', 'Free', 'Bound', 'Lost', 'Found', 'Gone', 'Here',
];

const TITLE_WORDS_B = [
  'Heart', 'Soul', 'Mind', 'Dream', 'Night', 'Day', 'Sky', 'Sea',
  'Fire', 'Rain', 'Wind', 'Storm', 'Light', 'Dark', 'Star', 'Moon',
  'Sun', 'Earth', 'World', 'Life', 'Love', 'Time', 'Space', 'Road',
  'Path', 'Way', 'Door', 'Window', 'Mirror', 'Shadow', 'Echo', 'Voice',
  'Song', 'Dance', 'Beat', 'Rhythm', 'Melody', 'Harmony', 'Silence',
  'Noise', 'Signal', 'Wave', 'Pulse', 'Breath', 'Touch', 'Sight',
  'Sound', 'Taste', 'Feeling', 'Memory', 'Future', 'Past', 'Moment',
  'Eternity', 'Infinity', 'Void', 'Abyss', 'Peak', 'Valley', 'River',
  'Ocean', 'Desert', 'Forest', 'City', 'Town', 'Street', 'Home',
  'Place', 'Face', 'Name', 'Word', 'Story', 'Chapter', 'Verse',
];

const ALBUM_WORDS_A = [
  'The', 'A', 'My', 'Our', 'Your', 'Their', 'This', 'That', 'One',
  'Two', 'Three', 'First', 'Last', 'New', 'Old', 'Young', 'Ancient',
  'Modern', 'Future', 'Past', 'Lost', 'Found', 'Hidden', 'Secret',
  'Open', 'Closed', 'Broken', 'Whole', 'Empty', 'Full', 'Dark', 'Light',
];

const ALBUM_WORDS_B = [
  'Sessions', 'Chronicles', 'Diaries', 'Stories', 'Tales', 'Legends',
  'Memories', 'Dreams', 'Visions', 'Reflections', 'Echoes', 'Shadows',
  'Lights', 'Sounds', 'Waves', 'Frequencies', 'Vibrations', 'Rhythms',
  'Melodies', 'Harmonies', 'Symphonies', 'Anthems', 'Ballads', 'Hymns',
  'Odes', 'Poems', 'Letters', 'Messages', 'Signals', 'Transmissions',
  'Broadcasts', 'Recordings', 'Archives', 'Collections', 'Volumes',
  'Chapters', 'Episodes', 'Seasons', 'Cycles', 'Phases', 'Stages',
];

// ── Genre-aware artist name generator ────────────────────────────────────────
function generateArtistNameForGenre(seed: number, genre: string): string {
  const pool = GENRE_POOLS[genre];

  if (pool) {
    const firstNames = pool.firstNames.filter(n => n.length > 0);
    const lastNames = pool.lastNames.filter(n => n.length > 0);

    if (firstNames.length === 0) {
      return generateArtistName(seed);
    }

    const type = hash(seed * 7 + 1) % 3;
    if (type === 0 && lastNames.length > 0) {
      const first = firstNames[hash(seed * 13) % firstNames.length];
      const last = lastNames[hash(seed * 17) % lastNames.length];
      return last.length > 0 ? `${first} ${last}` : first;
    } else if (type === 1) {
      return firstNames[hash(seed * 19) % firstNames.length];
    } else {
      // Use two words from the genre's title pool for a band name
      const titleWords = pool.titleWords.filter(w => w.length > 0 && w.length < 20);
      if (titleWords.length >= 2) {
        const w1 = titleWords[hash(seed * 31) % titleWords.length];
        const w2 = titleWords[hash(seed * 37) % titleWords.length];
        if (w1 !== w2) return `${w1} ${w2}`;
      }
      return firstNames[hash(seed * 23) % firstNames.length];
    }
  }

  return generateArtistName(seed);
}

// ── Generic artist name generator ────────────────────────────────────────────
function generateArtistName(seed: number): string {
  const type = hash(seed * 7 + 1) % 4;
  if (type === 0) {
    const first = FIRST_NAMES[hash(seed * 13) % FIRST_NAMES.length];
    const last = LAST_NAMES[hash(seed * 17) % LAST_NAMES.length];
    return `${first} ${last}`;
  } else if (type === 1) {
    return FIRST_NAMES[hash(seed * 19) % FIRST_NAMES.length];
  } else if (type === 2) {
    const last = LAST_NAMES[hash(seed * 23) % LAST_NAMES.length];
    const suffix = BAND_SUFFIXES[hash(seed * 29) % BAND_SUFFIXES.length];
    return `The ${last} ${suffix}`;
  } else {
    const w1 = TITLE_WORDS_A[hash(seed * 31) % TITLE_WORDS_A.length];
    const w2 = TITLE_WORDS_B[hash(seed * 37) % TITLE_WORDS_B.length];
    return `${w1} ${w2}`;
  }
}

// ── Genre-aware song title generator ─────────────────────────────────────────
function generateSongTitleForGenre(seed: number, genre: string): string {
  const pool = GENRE_POOLS[genre];

  if (pool && pool.titleWords.length > 0) {
    const words = pool.titleWords.filter(w => w.length > 0);
    if (words.length === 0) return generateSongTitle(seed);

    const type = hash(seed * 41 + 3) % 3;
    if (type === 0) {
      const a = words[hash(seed * 43) % words.length];
      const b = words[hash(seed * 47) % words.length];
      return a !== b ? `${a} ${b}` : a;
    } else if (type === 1) {
      const a = words[hash(seed * 53) % words.length];
      return a;
    } else {
      const a = words[hash(seed * 67) % words.length];
      const b = TITLE_WORDS_A[hash(seed * 71) % TITLE_WORDS_A.length];
      return `${a} (${b} Mix)`;
    }
  }

  return generateSongTitle(seed);
}

// ── Generic song title generator ──────────────────────────────────────────────
function generateSongTitle(seed: number): string {
  const type = hash(seed * 41 + 3) % 3;
  if (type === 0) {
    const a = TITLE_WORDS_A[hash(seed * 43) % TITLE_WORDS_A.length];
    const b = TITLE_WORDS_B[hash(seed * 47) % TITLE_WORDS_B.length];
    return `${a} ${b}`;
  } else if (type === 1) {
    const b = TITLE_WORDS_B[hash(seed * 53) % TITLE_WORDS_B.length];
    const a = TITLE_WORDS_A[hash(seed * 59) % TITLE_WORDS_A.length];
    return `${b} of ${a} ${TITLE_WORDS_B[hash(seed * 61) % TITLE_WORDS_B.length]}`;
  } else {
    const a = TITLE_WORDS_A[hash(seed * 67) % TITLE_WORDS_A.length];
    const b = TITLE_WORDS_B[hash(seed * 71) % TITLE_WORDS_B.length];
    const c = TITLE_WORDS_A[hash(seed * 73) % TITLE_WORDS_A.length];
    return `${a} ${b} (${c} Mix)`;
  }
}

// ── Album name generator ──────────────────────────────────────────────────────
function generateAlbumName(seed: number): string {
  const a = ALBUM_WORDS_A[hash(seed * 79) % ALBUM_WORDS_A.length];
  const b = ALBUM_WORDS_B[hash(seed * 83) % ALBUM_WORDS_B.length];
  return `${a} ${b}`;
}

// ── Total catalog size ────────────────────────────────────────────────────────
export const TOTAL_SONGS = 100_000_000;

// ── Core generator ────────────────────────────────────────────────────────────
export function generateSongById(index: number): Song {
  const h1 = hash(index + 1);
  const h2 = hash(index * 2 + 3);
  const h3 = hash(index * 3 + 7);

  // Genre — distributed evenly across all genres
  const genre = GENRES[h1 % GENRES.length];

  // Artist: ~10,000 unique artists (indices 0–9999), genre-aware
  const artistSeed = h1 % 10000;
  const artist = generateArtistNameForGenre(artistSeed, genre);

  // Album: each artist has ~10 albums
  const albumSeed = artistSeed * 10 + (h2 % 10);
  const album = generateAlbumName(albumSeed);

  // Title — genre-aware
  const title = generateSongTitleForGenre(h3, genre);

  // Year 1950–2024
  const year = 1950 + (h2 % 75);

  // Duration 90–360 seconds
  const duration = 90 + (h3 % 271);

  return {
    id: `song_${index}`,
    index,
    title,
    artist,
    album,
    genre,
    year,
    duration,
  };
}

export function generateSongsByRange(start: number, count: number): Song[] {
  const songs: Song[] = [];
  const end = Math.min(start + count, TOTAL_SONGS);
  for (let i = start; i < end; i++) {
    songs.push(generateSongById(i));
  }
  return songs;
}

// ── Search helpers ────────────────────────────────────────────────────────────
export function searchSongs(
  query: string,
  genre: string,
  decade: string,
  page: number,
  pageSize: number
): { songs: Song[]; hasMore: boolean } {
  const q = query.toLowerCase().trim();
  const results: Song[] = [];

  // Scan enough songs to fill multiple pages with margin
  // With 50 genres and 100M songs, each genre has ~2M songs
  // Scanning 600k should yield ~12k per genre — well above 200
  const SCAN_LIMIT = 600_000;
  const TARGET = pageSize * (page + 1) + 10;

  // Use a genre-specific scan start to spread results across the catalog
  // and avoid always returning the same songs
  let scanStart = 0;
  if (genre !== 'All') {
    // Spread genre scans across the catalog using a hash offset
    const genreIndex = GENRES.indexOf(genre);
    if (genreIndex >= 0) {
      // Each genre gets a different starting region of the catalog
      scanStart = Math.floor((genreIndex / GENRES.length) * TOTAL_SONGS * 0.5);
    } else {
      scanStart = hashStr(genre) % 1_000_000;
    }
  }

  if (decade !== 'All') {
    // Add a decade-based offset to further diversify results
    const decadeNum = parseInt(decade);
    const decadeOffset = ((decadeNum - 1950) / 10) * 100_000;
    scanStart = (scanStart + decadeOffset) % TOTAL_SONGS;
  }

  let scanned = 0;
  let i = scanStart;

  while (results.length < TARGET && scanned < SCAN_LIMIT) {
    const song = generateSongById(i % TOTAL_SONGS);
    scanned++;

    const matchesGenre = genre === 'All' || song.genre === genre;
    const matchesDecade =
      decade === 'All' ||
      Math.floor(song.year / 10) * 10 === parseInt(decade);
    const matchesQuery =
      !q ||
      song.title.toLowerCase().includes(q) ||
      song.artist.toLowerCase().includes(q) ||
      song.album.toLowerCase().includes(q) ||
      song.genre.toLowerCase().includes(q);

    if (matchesGenre && matchesDecade && matchesQuery) {
      results.push(song);
    }

    i++;
  }

  const start2 = page * pageSize;
  const end2 = start2 + pageSize;
  const pageResults = results.slice(start2, end2);

  return {
    songs: pageResults,
    hasMore: results.length > end2,
  };
}

// Get all songs for a specific artist (scan a window)
export function getSongsByArtist(artistName: string, limit = 200): Song[] {
  const results: Song[] = [];
  const SCAN = 2_000_000;
  for (let i = 0; i < SCAN && results.length < limit; i++) {
    const song = generateSongById(i);
    if (song.artist === artistName) {
      results.push(song);
    }
  }
  return results;
}

// Get all songs for a specific album
export function getSongsByAlbum(artistName: string, albumName: string, limit = 50): Song[] {
  const results: Song[] = [];
  const SCAN = 2_000_000;
  for (let i = 0; i < SCAN && results.length < limit; i++) {
    const song = generateSongById(i);
    if (song.artist === artistName && song.album === albumName) {
      results.push(song);
    }
  }
  return results;
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
