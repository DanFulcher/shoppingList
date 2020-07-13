import React, {useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import DraggableFlatList from 'react-native-draggable-flatlist';
import Icon from 'react-native-vector-icons/Entypo';
import Item from './Item';
import NoItems from '../NoItems';

import useItems from '../../hooks/Items/useItems';

import {colours} from '../../styles';

const SingleList = props => {
  const {itemOrder, setItemOrder, reorderItems, setEditMode} = useItems(
    props.list,
  );
  useEffect(() => {
    setItemOrder(props.list.items);
  }, [props.list.items, setItemOrder]);
  const renderItem = ({item, index, drag}) => {
    return (
      <TouchableOpacity onLongPress={drag} delayLongPress={200}>
        <Item data={item} listID={props.listID} itemID={index} />
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={[styles.listBody, props.multiView && styles.listBody__multiView]}>
      <DraggableFlatList
        ListHeaderComponent={
          <View style={styles.listBody__header}>
            <Text style={styles.listBody__title}>{props.list.name}</Text>
            <TouchableOpacity onPress={() => setEditMode(true)}>
              <Icon name="edit" color={colours.lessDark} size={20} />
            </TouchableOpacity>
          </View>
        }
        ListEmptyComponent={
          <NoItems
            title="List empty"
            text="This list is currently empty"
            text2="Press the '+' icon to start adding items"
          />
        }
        data={itemOrder}
        renderItem={renderItem}
        keyExtractor={(item, index) => `listItem-${index}`}
        onDragEnd={({data}) => reorderItems(data)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listBody: {
    width: Dimensions.get('screen').width,
    height: '95%',
    padding: 15,
    backgroundColor: colours.lighterBg,
    marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  listBody__multiView: {
    width: 350,
    flexBasis: '80%',
    height: '83%',
    marginRight: 10,
  },
  listBody__header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colours.lessDark,
    paddingTop: 10,
    paddingBottom: 20,
    marginBottom: 5,
  },
  modal__option: {
    fontSize: 16,
    color: colours.dark,
    marginBottom: 10,
  },
  listBody__title: {
    fontSize: 18,
    color: colours.dark,
    marginBottom: 0,
  },
});
export default SingleList;
