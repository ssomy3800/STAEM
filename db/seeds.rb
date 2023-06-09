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
    short_description: "Lost Ark is a massively multiplayer online action role-playing game.",
    long_description: "Lost Ark is a Korean MMO with a fantastical world. You play as the last bastion of humanity, traveling across continents and islands to reach the Ark before the Legion.",
    publisher: "Smilegate RPG",
    developer: "Smilegate RPG",
    price: 0,
    publish_date: Date.new(2023,2,11)
  )
  
  # Attach images and video for Lost Ark
  lost_ark.images.attach(
    io: URI.open("https://staem-seeds.s3.amazonaws.com/lostark.png"),
    filename: "la-cover.png"
  )
  lost_ark.images.attach(
    io: URI.open("https://staem-seeds.s3.amazonaws.com/la-ingame1.png"),
    filename: "la1.png"
  )
  lost_ark.images.attach(
    io: URI.open("https://staem-seeds.s3.amazonaws.com/la-ingame2.png"),
    filename: "la2.png"
  )
  lost_ark.images.attach(
    io: URI.open("https://staem-seeds.s3.amazonaws.com/la-ingame3.png"),
    filename: "la3.png"
  )
  lost_ark.images.attach(
    io: URI.open("https://staem-seeds.s3.amazonaws.com/la-ingame4.png"),
    filename: "la4.png"
  )
  lost_ark.images.attach(
    io: URI.open("https://staem-seeds.s3.amazonaws.com/la-ingame5.png"),
    filename: "la5.png"
  )
  lost_ark.images.attach(
    io: URI.open("https://staem-seeds.s3.amazonaws.com/la-bg.png"),
    filename: "la-bg.png"
  )

  
  lost_ark.video.attach(
    io: URI.open("https://staem-seeds.s3.amazonaws.com/lostark-trailer.webm"),
    filename: "lostark-trailer.webm")
  
  # Save the game after attaching images and video
  lost_ark.save!
  
csgo = Game.create(
  title: "CS:GO",
  short_description: "Counter-Strike: Global Offensive (CS:GO) is a multiplayer first-person shooter developed by Valve and Hidden Path Entertainment.",
  long_description: "CS:GO is the fourth game in the Counter-Strike series. Players join either the Terrorist or Counter-Terrorist team and attempt to complete objectives or eliminate the enemy team.",
  publisher: "Valve",
  developer: "Valve",
  price: 0,
  publish_date: Date.new(2012,8,21)
)

  
  # Attach images and video for Lost Ark
  csgo.images.attach(
    io: URI.open("https://staem-seeds.s3.amazonaws.com/csgo.png"),
    filename: "csgo-cover.png"
  )
  csgo.images.attach(
    io: URI.open("https://staem-seeds.s3.amazonaws.com/csgo-ingame1.png"),
    filename: "csgo1.png"
  )
  csgo.images.attach(
    io: URI.open("https://staem-seeds.s3.amazonaws.com/csgo-ingame2.png"),
    filename: "csgo2.png"
  )
  csgo.images.attach(
    io: URI.open("https://staem-seeds.s3.amazonaws.com/csgo-ingame3.png"),
    filename: "csgo3.png"
  )
  csgo.images.attach(
    io: URI.open("https://staem-seeds.s3.amazonaws.com/csgo-ingame4.png"),
    filename: "csgo4.png"
  )
  csgo.images.attach(
    io: URI.open("https://staem-seeds.s3.amazonaws.com/csgo-ingame5.png"),
    filename: "csgo5.png"
  )
  csgo.images.attach(
    io: URI.open("https://staem-seeds.s3.amazonaws.com/csgo-bg.png"),
    filename: "csgo-bg.png"
  )

  csgo.video.attach(
    io: URI.open("https://staem-seeds.s3.amazonaws.com/csgo-trailer.webm"),
    filename: "csgo-trailer.webm")
  

  
  # Save the game after attaching images and video
  csgo.save!
  # Repeat the process above for each game...
  dbd = Game.create(
    title: "Dead By Daylight",
    short_description: "Dead by Daylight is a multiplayer (4vs1) horror game where one player takes on the role of the savage Killer, and the other four players play as Survivors.",
    long_description: "Survivors play in third-person and have the advantage of better situational awareness. The Killer plays in first-person and is more focused on their prey.",
    publisher: "Behaviour Interactive",
    developer: "Behaviour Interactive",
    price: 20,
    publish_date: Date.new(2016,6,14)
  )
  
    
    # Attach images and video for Lost Ark
    dbd.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/DBD.png"),
      filename: "DBD-cover.png"
    )
    dbd.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/DBD-ingame1.png"),
      filename: "DBD1.png"
    )
    dbd.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/DBD-ingame2.png"),
      filename: "DBD2.png"
    )
    dbd.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/DBD-ingame3.png"),
      filename: "DBD3.png"
    )
    dbd.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/DBD-ingame4.png"),
      filename: "DBD4.png"
    )
    dbd.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/DBD-ingame5.png"),
      filename: "DBD5.png"
    )

    dbd.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/DBD-bg.png"),
      filename: "DBD-bg.png"
    )

  
    

  
      dbd.video.attach(
        io: URI.open("https://staem-seeds.s3.amazonaws.com/dbd-trailer.webm"),
        filename: "dbd-trailer.webm")

    
    # Save the game after attaching images and video
    dbd.save!

    lost_sky = Game.new(
      title: "Lost Sky",
      short_description: "Lost Sky is an adventure puzzle game set in a mysterious world.",
      long_description: "Embark on a journey through a captivating world filled with challenging puzzles and intriguing secrets. Unravel the mysteries of the Lost Sky and discover its hidden treasures.",
      publisher: "Dreamscape Studios",
      developer: "Dreamscape Studios",
      price: 19.99,
      publish_date: Date.new(2023, 5, 18)
    )
    
    # Attach images and video for Lost Sky
    lost_sky.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/ls-cover.png"),
      filename: "ls-cover.png"
    )
    lost_sky.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/ls-ingame1.png"),
      filename: "ls1.png"
    )
    lost_sky.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/ls-ingame2.png"),
      filename: "ls2.png"
    )
    lost_sky.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/ls-ingame3.png"),
      filename: "ls3.png"
    )
    lost_sky.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/ls-ingame4.png"),
      filename: "ls4.png"
    )
    lost_sky.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/ls-ingame5.png"),
      filename: "ls5.png"
    )
    lost_sky.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/ls-bg.png"),
      filename: "ls-bg.png"
    )

    lost_sky.video.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/lostsky-trailer.webm"),
      filename: "lostsky-trailer.webm")
      
    lost_sky.save!




    re4 = Game.create(
      title: "Resident Evil 4",
      short_description: "Resident Evil 4 is a survival horror game developed and published by Capcom.",
      long_description: "Resident Evil 4 follows the story of Leon S. Kennedy as he investigates the mysterious disappearance of the president's daughter and encounters dangerous creatures in a rural village.",
      publisher: "Capcom",
      developer: "Capcom",
      price: 19.99,
      publish_date: Date.new(2005, 1, 11)
    )
    
    re4.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/re4-cover.png"),
      filename: "re4-cover.png"
    )
    re4.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/re4-ingame1.png"),
      filename: "re4-ingame1.png"
    )
    re4.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/re4-ingame2.png"),
      filename: "re4-ingame2.png"
    )
    re4.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/re4-ingame3.png"),
      filename: "re4-ingame3.png"
    )
    re4.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/re4-ingame4.png"),
      filename: "re4-ingame4.png"
    )
    re4.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/re4-ingame5.png"),
      filename: "re4-ingame5.png"
    )
    re4.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/re4-bg.png"),
      filename: "re4-bg.png"
    )
  
    
    re4.video.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/re4-trailer.webm"),
      filename: "re4-trailer.webm"
    )
    
    re4.save!

    sf = Game.create(
      title: "Street Fighter 6",
      short_description: "Street Fighter 6 is a fighting game developed and published by Capcom.",
      long_description: "Street Fighter 6 features a diverse roster of characters who engage in intense one-on-one battles with various special moves and combos.",
      publisher: "Capcom",
      developer: "Capcom",
      price: 59.99,
      publish_date: Date.new(2022, 2, 14)
    )
    

    sf.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/sf-cover.png"),
      filename: "sf-cover.png"
    )
    sf.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/sf-ingame1.png"),
      filename: "sf-ingame1.png"
    )
    sf.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/sf-ingame2.png"),
      filename: "sf-ingame2.png"
    )
    sf.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/sf-ingame3.png"),
      filename: "sf-ingame3.png"
    )
    sf.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/sf-ingame4.png"),
      filename: "sf-ingame4.png"
    )
    sf.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/sf-ingame5.png"),
      filename: "sf-ingame5.png"
    )
    sf.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/sf-bg.png"),
      filename: "sf-bg.png"
    )
  
    
    sf.video.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/sf-trailer.webm"),
      filename: "sf-trailer.webm"
    )
    
    sf.save!

    apex = Game.create(
      title: "Apex Legends",
      short_description: "Apex Legends is a free-to-play battle royale game developed by Respawn Entertainment.",
      long_description: "Apex Legends is set in the Titanfall universe and features a fast-paced battle royale experience with a variety of unique characters, each with their own abilities.",
      publisher: "Electronic Arts",
      developer: "Respawn Entertainment",
      price: 0,
      publish_date: Date.new(2019, 2, 4)
    )
    
    apex.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/apex-cover.png"),
      filename: "apex-cover.png"
    )
    apex.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/apex-ingame1.png"),
      filename: "apex-ingame1.png"
    )
    apex.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/apex-ingame2.png"),
      filename: "apex-ingame2.png"
    )
    apex.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/apex-ingame3.png"),
      filename: "apex-ingame3.png"
    )
    apex.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/apex-ingame4.png"),
      filename: "apex-ingame4.png"
    )
    apex.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/apex-ingame5.png"),
      filename: "apex-ingame5.png"
    )
    apex.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/apex-bg.png"),
      filename: "apex-bg.png"
    )
  
    
    apex.video.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/apex-trailer.webm"),
      filename: "apex-trailer.webm"
    )
    
    apex.save!

    cod = Game.create(
      title: "Call of Duty: Modern Warfare 2",
      short_description: "Call of Duty: Modern Warfare 2 is a first-person shooter game developed by Infinity Ward and published by Activision.",
      long_description: "Call of Duty: Modern Warfare 2 is the sixth installment in the Call of Duty series and features a thrilling single-player campaign and a multiplayer mode with various maps and game modes.",
      publisher: "Activision",
      developer: "Infinity Ward",
      price: 29.99,
      publish_date: Date.new(2009, 11, 10)
    )
    
    
    cod.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/cod-cover.png"),
      filename: "cod-cover.png"
    )
    cod.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/cod-ingame1.png"),
      filename: "cod-ingame1.png"
    )
    cod.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/cod-ingame2.png"),
      filename: "cod-ingame2.png"
    )
    cod.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/cod-ingame3.png"),
      filename: "cod-ingame3.png"
    )
    cod.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/cod-ingame4.png"),
      filename: "cod-ingame4.png"
    )
    cod.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/cod-ingame5.png"),
      filename: "cod-ingame5.png"
    )
    cod.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/cod-bg.png"),
      filename: "cod-bg.png"
    )
  
    
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