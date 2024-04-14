import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');
const numColumns = 2;
const columnWidth = width / numColumns;

const ProductDetail = ({ product }) => {
  return (
    <View style={styles.productContainer}>
      <Image source={{ uri: product.mediaUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.variants[0].sellingPrice}</Text>
      </View>
      <View style={styles.heartIconContainer}>
        <Icon name="heart-o" size={20} color="black" style={styles.heartIcon} />
      </View>
    </View>
  );
};

const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/3114/3114883.png" }} style={styles.iconn} />
      <Text style={styles.headerText}>Women</Text>
      <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/622/622669.png" }} style={styles.iconn} />
      <Icon name="heart-o" size={24} color="black" />
      <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/2662/2662503.png" }} style={styles.iconn} />
    </View>
  );
};

const SortAndFilter = () => {
  return (
    <View style={styles.sortFilterRow}>
      <Text style={styles.headerTextyy}>98/100 Products</Text>
      <View style={styles.sortFilterIcons}>
        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/7794/7794633.png" }} style={styles.sortFilterIcon} />
        <Text style={styles.filter}>Sort</Text>
        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/8017/8017777.png" }} style={styles.sortFilterIcon} />
        <Text style={styles.filter}>Filter</Text>
      </View>
    </View>
  );
};


// API CALLING 
const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://storeapi.wekreta.in/api/v4/product/customer?id=0&secondaryKey=3d70712a-26fb-11ee-b277-029ff3b26cce&productName=&categoryName=serveware,kitchenware&subCategoryName=&subSubCategoryName=&brandName=&isFeatured=0&search=&currentPage=1&itemsPerPage=27&sortBy=createdDate&sortOrder=desc&isFetchListing=0&searchTag=&storeUuid=cb910d4a-bf60-11ed-814d-0252190a7100");
      const data = await response.json();
      // setProducts(data.products);
      setProducts(data.object)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SortAndFilter />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.row}>
          {products.map(product => (
            <ProductDetail key={product.id} product={product} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconn: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
    marginLeft: 10,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  filter:{
    fontSize: 14,
    fontWeight: '400',
    color: 'gray',
  },
  heartIconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'transparent',
  },
  heartIcon: {
    backgroundColor: 'transparent',
  },
  headerTextyy: {
    marginTop:8,
    fontSize: 14,
    fontWeight: '400',
    color: 'gray',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  productContainer: {
    width: columnWidth - 20, // Subtracting padding
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  details: {
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
  },
  scrollViewContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  sortFilterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  sortFilterIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortFilterIcon: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    marginLeft: 10,
  },
});

export default App;
