#! /usr/bin/env node

console.log('This script populates some test Items and categories to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
  console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
  return
}

const async = require('async')
const Item = require('./models/item')
const Category = require('./models/category')



const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const items = []
const categories = []


function categoryCreate(name, description, cb) {
  const categoryDetail = { name, description };
  
  const category = new Category(categoryDetail);
       
  category.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New category: ' + category);
    categories.push(category)
    cb(null, category)
  });
}

function itemCreate(name, description, category, price, numberInStock, cb) {
  const itemDetail = { name, description, category, price, numberInStock }

  const item = new Item(itemDetail);
       
  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Item: ' + item);
    items.push(item)
    cb(null, item);
  });
}

function createCategory(cb) {
  async.series([
    function(callback) {
      categoryCreate('Igneous', 'Igneous rocks form when molten rock (magma or lava) cools and solidifies.', callback);
    },
    function(callback) {
      categoryCreate('Metamorphic', 'Metamorphic rocks result when existing rocks are changed by heat, pressure, or reactive fluids, such as hot, mineral-laden water.', callback);
    },
    function(callback) {
      categoryCreate('Sedimentary', 'Sedimentary rocks originate when particles settle out of water or air, or by precipitation of minerals from water.', callback);
    },
  ],
  // optional callback
  cb);
}


function createItems(cb) {
    async.parallel([
        function(callback) {
          itemCreate('Granite Pegmatite', 'This rock formed deep in the crust, near the top of a crystallizing magma chamber.  It is composed of the minerals quartz (gray), orthoclase (pink), albite (white), and mica (dark and platy). The larger crystals grew more slowly than the smaller crystals.', categories[0], 5, 100, callback);
        },
        function(callback) {
          itemCreate('Diabase', 'This rock solidified from a basaltic magma within a few hundred meters of the surface, probably beneath a volcano.  It cooled rapidly, giving it a fine-grained, peppery appearance.  The black mineral is pyroxene, and the white one is plagioclase', categories[0], 3, 90, callback);
        },
        function(callback) {
          itemCreate('Manhattan Schist', 'Originally a shale, this schist now consists of dark, biotite-rich layers and finer-grained, light-colored layers made of gray quartz and white orthoclase. The distinct layering developed perpendicular to the direction of compression. This schist underlies most of Manhattan.', categories[1], 8, 70, callback);
        },
        function(callback) {
          itemCreate('Slate', 'This slate was also once a shale. Because the shale was metamorphosed only slightly, its textures changed little.  This sample is from the Grenville slate, widely used for roofing.', categories[1], 6, 60, callback);
        },
        function(callback) {
          itemCreate('Limestone', 'Limestone is one of the most widespread sedimentary rocks. Many organisms, from corals to microscopic foraminifera, grow shells composed of carbonates. Most limestone forms when these organisms die and their carbonate shells accumulate in shallow seas.', categories[2], 1, 150, callback);
        },
        function(callback) {
          itemCreate('Shale ', 'Shale is made up clay and silt, particles that are finer than sand.  Clay and silt are deposited in slow-moving rivers, at the far ends of deltas, and in other quiet environments where slow-moving water cannot keep the particles suspended.', categories[2], 2, 90, callback);
        },
        ],
        // optional callback
        cb);
}




async.series([
  createCategory,
  createItems
],
// Optional callback
function(err, results) {
  if (err) {
    console.log('FINAL ERR: '+err);
  }
  else {
    console.log('ITEMinstances: '+items);
      
  }
  // All done, disconnect from database
  mongoose.connection.close();
});