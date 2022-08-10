# require 'rest-client'
# require 'byebug'

# puts "Getting Poke Data"

#     def pokeIterator
#         15.times { |i| RestClient.get("https://pokeapi.co/api/v2/pokemon/#{i}") }
#     end

    

#     def poke_dataset
#         array = [1, 2, 3, 4, 5, 6]
#         # poke = RestClient.get("https://pokeapi.co/api/v2/pokemon?limit=7")
#         # poke_array = JSON.parse(poke)
#         poke_array = array.map((number) => RestClient.get(`https://pokeapi.co/api/v2/pokemon/#{number}/`))
#         poke_jasoned_array = JSON.parse(poke_array)
        

#         byebug

#         # poke_array.each do |p|
#         #     Pokemon.create(
#         #         species: p["name"],
#         #     )
#         # end
#     end
#  poke_dataset() 
#  puts "Seeding Poke Data"
