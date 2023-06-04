# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])

#   Character.create(name: "Luke", movie: movies.first)
require 'open-uri'


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
    io: URI.open("https://staem-seeds.s3.amazonaws.com/lostark.png"),
    filename: "la-cover.png"
  )

  
  # Attach video for Lost Ark
  # begin
  #   lost_ark.video.attach(
  #     io: URI.open("https://your-s3-bucket-url/lost_ark_video.mp4"),
  #     filename: "lost_ark_video.mp4"
  #   )
  # rescue OpenURI::HTTPError
  #   puts "No video found for Lost Ark"
  # end
  
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
    io: URI.open("https://staem-seeds.s3.amazonaws.com/csgo.png"),
    filename: "csgo-cover.png"
  )

  
  # Attach video for Lost Ark
  # begin
  #   csgo.video.attach(
  #     io: URI.open("https://your-s3-bucket-url/csgo_video.mp4"),
  #     filename: "csgo_video.mp4"
  #   )
  # rescue OpenURI::HTTPError
  #   puts "No video found for CSGO"
  # end
  
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
      io: URI.open("https://staem-seeds.s3.amazonaws.com/DBD-ingame1.png"),
      filename: "DBD1.png"
    )
    dbd.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/DBD-ingame1.png"),
      filename: "DBD2.png"
    )
    dbd.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/DBD-ingame1.png"),
      filename: "DBD3.png"
    )
    dbd.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/DBD-ingame1.png"),
      filename: "DBD4.png"
    )
    dbd.images.attach(
      io: URI.open("https://staem-seeds.s3.amazonaws.com/DBD.png"),
      filename: "DBD-cover.png"
    )
  
    

    # begin
    #   dbd.video.attach(
    #     io: URI.open("https://your-s3-bucket-url/dbd_video.mp4"),
    #     filename: "dbd_video.mp4"
    #   )
    # rescue OpenURI::HTTPError
    #   puts "No video found for dbd"
    # end
    
    # Save the game after attaching images and video
    dbd.save!
  # Tags
  action = Tag.create(name: "Action")
  horror = Tag.create(name: "Horror")
  fps = Tag.create(name: "FPS")
  mmorpg = Tag.create(name: "MMORPG")
  
  # Associations
  lost_ark.tags << action << mmorpg
  csgo.tags << action << fps
  dbd.tags << action << horror