import React, {useState, Component} from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Image,
    FlatList,
    Dimensions
} from 'react-native';
import colors from '../config/colors';
import _ from 'lodash';
import {range, random} from "lodash";

import {
    Text,
    Card,
    Tile,
    Icon,
    Avatar,
    ListItem
} from 'react-native-elements';

import Pie from '../components/Pie';
import data from '../helpers/data';
import Theme from '../helpers/theme';


export default class consumptionNow extends Component {

    state: State;
    devicesOn: devicesOn;

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            spendingsPerYear: data.spendingsPerYear
        };
        this._onPieItemSelected = this._onPieItemSelected.bind(this);
        this._shuffle = this._shuffle.bind(this);

        this.devicesOn = [
            {
                name: 'Cafeteira',
                onSince: 'a 5 min'
            }, {
                name: 'Televisão',
                onSince: 'a 2 hrs'
            }, {
                name: 'Computador',
                onSince: 'a 45 min'
            }, {
                name: 'Máquina de lavar',
                onSince: 'a uma hora'
            }
        ];
    }

    _onPieItemSelected(newIndex) {
        this.setState({
            ...this.state,
            activeIndex: newIndex,
            spendingsPerYear: this._shuffle(data.spendingsPerYear)
        });
    }

    _shuffle(a) {
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [
                a[i - 1],
                a[j]
            ] = [
                a[j],
                a[i - 1]
            ];
        }
        return a;
    }

    render() {
        const renderRow = ({item}) => {
            return (<ListItem onPress={log} title={item.title} leftIcon={{
                name: item.icon
            }} chevron="chevron" bottomDivider="bottomDivider"/>);
        };
        const height = 200;
        const width = 500;

        return (<ScrollView>
            <View style={styles.container}>
                <Card containerStyle={{
                        marginTop: 15
                    }}>
                    <Text style={styles.fonts} h3>
                        Aparelhos ligados
                    </Text>
                    <View style={styles.list}>
                        {
                            this.devicesOn.map((l, i) => (<ListItem key={i} title={l.name} titleStyle={{
                                color: 'black'
                            }} rightTitle={l.onSince} rightTitleStyle={{
                                color: 'black'
                            }} bottomDivider/>))
                        }
                    </View>
                </Card>
                <Card containerStyle={{
                        marginTop: 15
                    }}>
                    <Text style={styles.fonts} h3>
                        Consumo Hoje
                    </Text>
                    <Pie
                      pieWidth={150}
                      pieHeight={150}
                      onItemSelected={this._onPieItemSelected}
                      colors={Theme.colors}
                      width={width}
                      height={height}
                      data={data.spendingsLastMonth} />
                </Card>
            </View>
        </ScrollView>);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        alignItems: "center"
    },
    list: {
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: colors.greyOutline,
        backgroundColor: '#fff'
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#FD6B78'
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22
    },
    fonts: {
        marginBottom: 8
    },
    user: {
        flexDirection: 'row',
        marginBottom: 6
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 10
    },
    name: {
        fontSize: 16,
        marginTop: 5
    },
    social: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingImage: {
        height: 19.21,
        width: 100
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    }
});
