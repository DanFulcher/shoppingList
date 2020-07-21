import React, {useState, useEffect} from 'react';
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
import Modal from '../Modal';

import useItems from '../../hooks/Items/useItems';
import useLists from '../../hooks/Lists/useLists';

import {colours} from '../../styles';

const SingleList = props => {
  const {checkCount} = useLists();
  const {itemOrder, setItemOrder, reorderItems, setEditMode} = useItems(
    props.list,
  );
  const [checkedItems, setCheckedItems] = useState(checkCount(itemOrder));
  const [listComplete, setListComplete] = useState(
    checkedItems === itemOrder.length,
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setItemOrder(props.list.items);
  }, [props.list.items, setItemOrder]);

  useEffect(() => {
    if (checkedItems === itemOrder.length) {
      setListComplete(true);
    } else {
      setListComplete(false);
    }
  }, [setListComplete, checkedItems, itemOrder]);
  const handleItemCheck = isItemChecked => {
    setCheckedItems(isItemChecked ? checkedItems + 1 : checkedItems - 1);
    if (isItemChecked && checkedItems + 1 === itemOrder.length) {
      setListComplete(true);
      setShowModal(true);
    } else {
      setListComplete(false);
    }
  };

  const renderItem = ({item, index, drag}) => {
    return (
      <Item
        data={item}
        listID={props.listID}
        itemID={index}
        drag={drag}
        updateChecked={val => {
          handleItemCheck(val);
        }}
      />
    );
  };
  return (
    <>
      <View
        style={[
          styles.listBody,
          props.multiView && styles.listBody__multiView,
        ]}>
        <DraggableFlatList
          ListHeaderComponent={
            <View style={styles.listBody__header}>
              <View style={styles.listBody__header__titleCont}>
                <Text style={styles.listBody__title}>{props.list.name}</Text>
                {listComplete && (
                  <Text style={styles.listBody__header__complete}>
                    (List Complete)
                  </Text>
                )}
              </View>
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
      <Modal
        showModal={showModal}
        toggle={() => setShowModal(!showModal)}
        modalTitle="List Complete!"
        modalText={`You have got everything on ${props.list.name}`}
        modalType="Done"
      />
    </>
  );
};

const styles = StyleSheet.create({
  listBody: {
    width: Dimensions.get('screen').width,
    height: '100%',
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
  listBody__header__titleCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listBody__title: {
    fontSize: 18,
    color: colours.dark,
  },
  listBody__header__complete: {
    fontSize: 12,
    color: colours.lessDark,
    marginLeft: 10,
    alignSelf: 'flex-end',
    marginBottom: 3,
  },
});
export default SingleList;
