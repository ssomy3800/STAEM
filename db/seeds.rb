# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])

#   Character.create(name: "Luke", movie: movies.first)
require 'open-uri'

CartedItem.destroy_all

User.destroy_all
Game.destroy_all
Tag.destroy_all

User.create!(
    username: "DemoUser",
    password: "DemoPassword",
    firstname: "demo",
    lastname: "demo",
    email: "demo@gmail.com"
  )
  lost_ark = Game.new(
    title: "Lost Ark",
    short_description: "Lost Ark is a visually stunning MMORPG developed by Smilegate RPG. With its action-packed, skill-oriented combat system, the game offers an immersive experience in a rich fantasy world full of dynamic quests and a wide range of classes to choose from.",
    long_description: "Lost Ark is a visually compelling MMORPG that successfully combines action and role-playing elements to provide an engaging gaming experience. Developed by Smilegate RPG, the game captivates players with an expansive, beautifully designed fantasy world. The gameplay is defined by a dynamic, skill-based combat system that demands strategic utilization of a chosen class's abilities. With a broad variety of classes each possessing unique skill sets, Lost Ark diversifies the gameplay and increases replayability. The game offers dynamic quests, thrilling boss battles, and treasure hunts that create a rich and evolving narrative. With additional features like cooperative modes, PVP, and naval battles, Lost Ark ensures a truly immersive and versatile gaming experience.",
    publisher: "Smilegate RPG",
    developer: "Smilegate RPG",
    price: 0,
    publish_date: Date.new(2023,2,11)
  )
  
  # Attach images and video for Lost Ark
  lost_ark.images.attach([
    { io: URI.open("https://staem-seeds.s3.amazonaws.com/lostark.png"), filename: "la-cover.png" },
    { io: URI.open("https://staem-seeds.s3.amazonaws.com/la-ingame1.png"), filename: "la1.png" },
    { io: URI.open("https://staem-seeds.s3.amazonaws.com/la-ingame2.png"), filename: "la2.png" },
    { io: URI.open("https://staem-seeds.s3.amazonaws.com/la-ingame3.png"), filename: "la3.png" },
    { io: URI.open("https://staem-seeds.s3.amazonaws.com/la-ingame4.png"), filename: "la4.png" },
    { io: URI.open("https://staem-seeds.s3.amazonaws.com/la-ingame5.png"), filename: "la5.png" },
    { io: URI.open("https://staem-seeds.s3.amazonaws.com/la-bg.png"),filename: "la-bg.png"}
  ])


  
  lost_ark.video.attach(
    io: URI.open("https://staem-seeds.s3.amazonaws.com/lostark-trailer.webm"),
    filename: "lostark-trailer.webm")
  
  # Save the game after attaching images and video
  lost_ark.save!
  
csgo = Game.create(
  title: "CS:GO",
  short_description: "Counter-Strike: Global Offensive (CSGO) is a competitive first-person shooter known for its tactical gameplay, diverse maps, and robust eSports scene.",
  long_description: "Counter-Strike: Global Offensive (CSGO) is a highly competitive first-person shooter that emphasizes strategic team play and individual skill. The game offers various modes such as Bomb Defusal and Hostage Rescue, each demanding different strategies. Its diverse selection of maps, each with unique layouts, keeps matches challenging. The game's robust eSports scene, with numerous tournaments worldwide, showcases the depth of skill and strategy required to excel. Regular updates, including new maps, weapons, and cosmetic items, keep the community engaged. With its tactical depth, high skill ceiling, and active community, CSGO remains a cornerstone of competitive gaming.",
  publisher: "Valve",
  developer: "Valve",
  price: 0,
  publish_date: Date.new(2012,8,21)
)

  
  # Attach images and video for Lost Ark
  csgo.images.attach([
    { io: URI.open("https://staem-seeds.s3.amazonaws.com/csgo.png"), filename: "csgo-cover.png" },
    { io: URI.open("https://staem-seeds.s3.amazonaws.com/csgo-ingame1.png"), filename: "csgo1.png" },
    { io: URI.open("https://staem-seeds.s3.amazonaws.com/csgo-ingame2.png"), filename: "csgo2.png" },
    { io: URI.open("https://staem-seeds.s3.amazonaws.com/csgo-ingame3.png"), filename: "csgo3.png" },
    { io: URI.open("https://staem-seeds.s3.amazonaws.com/csgo-ingame4.png"), filename: "csgo4.png" },
    { io: URI.open("https://staem-seeds.s3.amazonaws.com/csgo-ingame5.png"), filename: "csgo5.png" },
    { io: URI.open("https://staem-seeds.s3.amazonaws.com/csgo-bg.png"), filename: "csgo-bg.png" }
  ])
  

  csgo.video.attach(
    io: URI.open("https://staem-seeds.s3.amazonaws.com/csgo-trailer.webm"),
    filename: "csgo-trailer.webm")
  

  
  # Save the game after attaching images and video
  csgo.save!
  # Repeat the process above for each game...
  dbd = Game.create(
    title: "Dead By Daylight",
    short_description: "Dead by Daylight is an asymmetrical multiplayer horror game where players take on the roles of either ruthless killers or survivors trying to evade a gruesome end.",
    long_description: " Dead by Daylight is an asymmetrical multiplayer game that plunges players into a suspense-filled horror setting. Players have the choice to embody one of the many iconic killers or one of the survivors desperately trying to avoid a terrifying fate. Each role has unique objectives and gameplay: survivors need to cooperate to repair generators and escape, while the killer must prevent their escape. Regular updates introduce new killers, survivors, and maps, keeping the experience fresh. With its tense atmosphere, strategic gameplay, and continual content additions, Dead by Daylight provides a uniquely terrifying multiplayer experience.",
    publisher: "Behaviour Interactive",
    developer: "Behaviour Interactive",
    price: 20,
    publish_date: Date.new(2016,6,14)
  )
  
    
    # Attach images and video for Lost Ark
    dbd.images.attach([
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/DBD.png"), filename: "DBD-cover.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/DBD-ingame1.png"), filename: "DBD1.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/DBD-ingame2.png"), filename: "DBD2.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/DBD-ingame3.png"), filename: "DBD3.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/DBD-ingame4.png"), filename: "DBD4.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/DBD-ingame5.png"), filename: "DBD5.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/DBD-bg.png"), filename: "DBD-bg.png" }
    ])

  
    

  
      dbd.video.attach(
        io: URI.open("https://staem-seeds.s3.amazonaws.com/dbd-trailer.webm"),
        filename: "dbd-trailer.webm")

    
    # Save the game after attaching images and video
    dbd.save!

    lost_sky = Game.new(
      title: "Lost Sky",
      short_description: "Lost Sky is a captivating side-scrolling adventure game set in a dystopian world. It offers challenging puzzles, unique gameplay mechanics, and a deep storyline that unfolds throughout the journey",
      long_description: "Lost Sky is an adventurous side-scrolling game that transports players into a beautifully eerie, dystopian world. The gameplay revolves around solving a wide array of challenging puzzles and navigating through varied terrains filled with dangerous obstacles. Unique game mechanics, such as grappling and manipulating the environment, ensure that the gameplay remains engaging and fresh. The game's art design is a visual treat, adding layers to the emotional depth of the narrative. Lost Sky's storyline is thought-provoking and unfolds progressively as players navigate through the game, enhancing the overall immersion and attachment to the game world.",
      publisher: "Dreamscape Studios",
      developer: "Dreamscape Studios",
      price: 19.99,
      publish_date: Date.new(2023, 5, 18)
    )
    
    # Attach images and video for Lost Sky
    lost_sky.images.attach([
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/ls-cover.png"), filename: "ls-cover.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/ls-ingame1.png"), filename: "ls1.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/ls-ingame2.png"), filename: "ls2.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/ls-ingame3.png"), filename: "ls3.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/ls-ingame4.png"), filename: "ls4.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/ls-ingame5.png"), filename: "ls5.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/ls-bg.png"), filename: "ls-bg.png" }
    ])

    lost_sky.video.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/lostsky-trailer.webm"),
      filename: "lostsky-trailer.webm")
      
    lost_sky.save!




    re4 = Game.create(
      title: "Resident Evil 4",
      short_description: "Resident Evil 4 Remake revives the classic survival horror game with updated graphics, modernized controls, and enriched story elements, while preserving its tension-filled atmosphere.",
      long_description: "The Resident Evil 4 Remake is a thrilling reinvention of the classic survival horror game. While it preserves the original's atmosphere and compelling narrative, the remake enhances the experience with improved graphics that bring the eerie setting to life. Modernized controls and gameplay mechanics ensure smoother and more responsive action. Expanded story elements provide more depth and richness to the characters and plot. With the same sense of creeping dread and intense action sequences, Resident Evil 4 Remake is a lovingly crafted tribute to one of the most beloved games in the Resident Evil series.",
      publisher: "Capcom",
      developer: "Capcom",
      price: 19.99,
      publish_date: Date.new(2005, 1, 11)
    )
    
    re4.images.attach([
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/re4-cover.png"), filename: "re4-cover.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/re4-ingame1.png"), filename: "re4-ingame1.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/re4-ingame2.png"), filename: "re4-ingame2.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/re4-ingame3.png"), filename: "re4-ingame3.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/re4-ingame4.png"), filename: "re4-ingame4.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/re4-ingame5.png"), filename: "re4-ingame5.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/re4-bg.png"), filename: "re4-bg.png" }
    ])
  
    
    re4.video.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/re4-trailer.webm"),
      filename: "re4-trailer.webm"
    )
    
    re4.save!

    sf = Game.create(
      title: "Street Fighter 6",
      short_description: "Street Fighter 6, the latest installment in Capcom's iconic fighting series, boasts new mechanics, an expanded roster, and enhanced visuals, taking the adrenaline-pumping action to the next level.",
      long_description: "Street Fighter 6 is the newest chapter in Capcom's legendary fighting series, promising intense one-on-one battles that the franchise is known for. The game incorporates new mechanics and systems, giving players more depth to explore while maintaining the classic fast-paced action. The expanded roster of fighters each have distinct abilities and styles, providing variety in gameplay and strategies. High-definition visuals, dynamic environments, and improved audio create an immersive atmosphere. Single-player campaigns and multiplayer modes, along with local and online competitions, make Street Fighter 6 a must-play for any fighting game enthusiast.",
      publisher: "Capcom",
      developer: "Capcom",
      price: 59.99,
      publish_date: Date.new(2022, 2, 14)
    )
    

    sf.images.attach([
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/sf-cover.png"), filename: "sf-cover.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/sf-ingame1.png"), filename: "sf-ingame1.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/sf-ingame2.png"), filename: "sf-ingame2.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/sf-ingame3.png"), filename: "sf-ingame3.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/sf-ingame4.png"), filename: "sf-ingame4.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/sf-ingame5.png"), filename: "sf-ingame5.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/sf-bg.png"), filename: "sf-bg.png" }
    ])
  
    
    sf.video.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/sf-trailer.webm"),
      filename: "sf-trailer.webm"
    )
    
    sf.save!

    apex = Game.create(
      title: "Apex Legends",
      short_description: "Apex Legends is a high-octane battle royale featuring unique characters with special abilities, intense gunfights, and fast-paced strategic gameplay within a futuristic universe.",
      long_description: "Apex Legends is a dynamic battle royale game set within a stunning sci-fi universe. It introduces a cast of unique characters, each with their own special abilities and roles, allowing players to form strategic teams. Fast-paced gunfights and a focus on team strategy set Apex Legends apart from other games in the genre. The gameplay incorporates unique mechanics like respawning teammates and using zip-lines, adding layers of strategy. The map's rich design, containing a variety of terrains and locales, keeps every match interesting. Apex Legends also features regular content updates and seasonal events, keeping the game fresh and engaging.",
      publisher: "Electronic Arts",
      developer: "Respawn Entertainment",
      price: 0,
      publish_date: Date.new(2019, 2, 4)
    )
    
    apex.images.attach([
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/apex-cover.png"), filename: "apex-cover.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/apex-ingame1.png"), filename: "apex-ingame1.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/apex-ingame2.png"), filename: "apex-ingame2.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/apex-ingame3.png"), filename: "apex-ingame3.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/apex-ingame4.png"), filename: "apex-ingame4.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/apex-ingame5.png"), filename: "apex-ingame5.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/apex-bg.png"), filename: "apex-bg.png" }
    ])
  
    
    apex.video.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/apex-trailer.webm"),
      filename: "apex-trailer.webm"
    )
    
    apex.save!

    cod = Game.create(
      title: "Call of Duty: Modern Warfare 2",
      short_description: "Call of Duty: Modern Warfare 2 is a high-stakes first-person shooter featuring a dramatic campaign, various multiplayer modes, and an engaging cooperative mode, all set in a modern warfare context.",
      long_description: "Call of Duty: Modern Warfare 2 is a fast-paced first-person shooter set in the gritty reality of modern warfare. The game boasts a dramatic, emotionally charged campaign that unfolds globally. The multiplayer component features a variety of game modes, each providing unique challenges and requiring strategic team play. The game also includes a cooperative mode, known as Special Ops, where players can team up for intense, bite-sized missions. Modern Warfare 2's impressive graphics, cinematic storytelling, and balanced gameplay make it a standout title in the Call of Duty franchise.",
      publisher: "Activision",
      developer: "Infinity Ward",
      price: 29.99,
      publish_date: Date.new(2009, 11, 10)
    )
    
    
    cod.images.attach([
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/cod-cover.png"), filename: "cod-cover.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/cod-ingame1.png"), filename: "cod-ingame1.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/cod-ingame2.png"), filename: "cod-ingame2.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/cod-ingame3.png"), filename: "cod-ingame3.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/cod-ingame4.png"), filename: "cod-ingame4.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/cod-ingame5.png"), filename: "cod-ingame5.png" },
      { io: URI.open("https://staem-seeds.s3.amazonaws.com/cod-bg.png"), filename: "cod-bg.png" }
    ])
  
    
    cod.video.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/cod-trailer.webm"),
      filename: "cod-trailer.webm"
    )
    
    cod.save!










  # Tags
# Create additional tags
action = Tag.find_or_create_by(name: "Action")
horror = Tag.find_or_create_by(name: "Horror")
fps = Tag.find_or_create_by(name: "FPS")
mmorpg = Tag.find_or_create_by(name: "MMORPG")
adventure = Tag.find_or_create_by(name: "Adventure")
anime = Tag.find_or_create_by(name: "Anime")
open_world = Tag.find_or_create_by(name: "Open-World")
science_fiction = Tag.find_or_create_by(name: "Science-Fiction")
racing = Tag.find_or_create_by(name: "Racing")
puzzle = Tag.find_or_create_by(name: "Puzzle")
platformer = Tag.find_or_create_by(name: "Platformer")
sports = Tag.find_or_create_by(name: "Sports")
strategy = Tag.find_or_create_by(name: "Strategy")
simulation = Tag.find_or_create_by(name: "Simulation")
stealth = Tag.find_or_create_by(name: "Stealth")

# Associate tags with games
lost_ark.tags << action << mmorpg << adventure << anime << open_world << science_fiction << racing << puzzle << platformer
csgo.tags << action << fps << adventure << anime << open_world << science_fiction << sports << strategy << stealth
dbd.tags << action << horror << adventure << anime << open_world << racing << puzzle << platformer << strategy << stealth
lost_sky.tags << action << adventure << anime << open_world << science_fiction << racing << sports << strategy << simulation << stealth
# Associate tags with new games
re4.tags << action << horror << adventure << anime << open_world << racing << puzzle << platformer << strategy << stealth
sf.tags << action << adventure << anime << open_world << sports << strategy << simulation
apex.tags << action << fps << adventure << open_world << sports << strategy << stealth
cod.tags << action << fps << adventure << open_world << science_fiction << sports << strategy << stealth


  demo_user = User.find_by(username: "DemoUser")
lost_ark = Game.find_by(title: "Lost Ark")
lost_sky = Game.find_by(title: "Lost Sky")

# Add Lost Ark to demo user's cart with purchased: true
CartedItem.create(
  user: demo_user,
  game: lost_ark,
  purchased: true
)

# Add Lost Sky to demo user's cart with purchased: false
CartedItem.create(
  user: demo_user,
  game: lost_sky,
  purchased: false
)
CartedItem.create(
  user: demo_user,
  game: csgo,
  purchased: false
)
CartedItem.create(
  user: demo_user,
  game: dbd,
  purchased: false
)