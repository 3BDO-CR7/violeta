import {Dimensions , I18nManager} from "react-native";
import COLORS from '../../src/consts/colors'

const width     = Dimensions.get('window').width;
const height    = Dimensions.get('window').height;

const styles = ({

    // Style Color ConText

    text_gray : {
        color               : COLORS.gray
    },
    text_light_gray : {
        color               : COLORS.light_gray
    },
    text_red : {
        color               : COLORS.red
    },
    text_pink : {
        color               : COLORS.pink
    },
    text_black : {
        color               : COLORS.black
    },
    text_green : {
        color               : COLORS.green
    },
    text_black_gray : {
        color               : COLORS.black_gray
    },
    text_yallow : {
        color               : COLORS.yallow
    },
    text_White : {
        color               : '#FFF'
    },
    text_Opacity : {
      opacity               : 0.5,
        color               : '#FFF'
    },

    // Style Font

    textRegular : {
        fontFamily          : 'cairo',
    },
    textBold : {
        fontFamily          : 'cairoBold'
    },
    textDecoration : {
        textDecorationLine  : "underline"
    },
    fontBold : {
        fontWeight          : "bold"
    },
    textSize_5 : {
        fontSize            : 5,
    },
    textSize_10 : {
        fontSize            : 10,
    },
    textSize_12 : {
        fontSize            : 12,
    },
    textSize_13 : {
        fontSize            : 13,
    },
    textSize_14 : {
        fontSize            : 14,
    },
    textSize_16 : {
        fontSize            : 16,
    },
    textSize_18 : {
        fontSize            : 18,
    },
    textSize_20 : {
        fontSize            : 20,
    },
    textSize_22 : {
        fontSize            : 22,
    },
    textSize_24 : {
        fontSize            : 24,
    },
    textSize_26 : {
        fontSize            : 26,
    },
    textSize_28 : {
        fontSize            : 28,
    },
    textSize_30 : {
        fontSize            : 30,
    },
    textSize_32 : {
        fontSize            : 32,
    },

    // Style Direction Text

    textCenter : {
        textAlign           : "center"
    },
    textRight : {
        textAlign           : "right"
    },
    textLeft : {
        textAlign           : "left"
    },

    // Margin Space Vertical

    marginVertical_0 : {
        marginVertical      : 0
    },
    marginVertical_5 : {
        marginVertical      : 5
    },
    marginVertical_10 : {
        marginVertical      : 10
    },
    marginVertical_15 : {
        marginVertical      : 15
    },
    marginVertical_20 : {
        marginVertical      : 20
    },
    marginVertical_25 : {
        marginVertical      : 25
    },
    marginVertical_30 : {
        marginVertical      : 30
    },

    // Margin Space Horizontal

    marginHorizontal_0 : {
        marginHorizontal    : 0
    },
    marginHorizontal_5 : {
        marginHorizontal    : 5
    },
    marginHorizontal_10 : {
        marginHorizontal    : 10
    },
    marginHorizontal_15 : {
        marginHorizontal    : 15
    },
    marginHorizontal_20 : {
        marginHorizontal    : 20
    },
    marginHorizontal_25 : {
        marginHorizontal    : 25
    },
    marginHorizontal_30 : {
        marginHorizontal    : 30
    },

    // Padding Space Vertical

    paddingVertical_0 : {
        paddingVertical      : 0
    },
    paddingVertical_5 : {
        paddingVertical      : 5
    },
    paddingVertical_10 : {
        paddingVertical      : 10
    },
    paddingVertical_15 : {
        paddingVertical      : 15
    },
    paddingVertical_20 : {
        paddingVertical      : 20
    },
    paddingVertical_25 : {
        paddingVertical      : 25
    },
    paddingVertical_30 : {
        paddingVertical      : 30
    },
    paddingRight : {
        paddingRight         : 0
    },
    paddingLeft : {
        paddingLeft          : 0
    },
    paddingRight_5 : {
        paddingRight         : 5
    },
    paddingLeft_5 : {
        paddingLeft          : 5
    },
    paddingTopHeader : {
        paddingTop           : 40
    },

    // Padding Space Horizontal

    paddingHorizontal_0 : {
        paddingHorizontal    : 0
    },
    paddingHorizontal_5 : {
        paddingHorizontal    : 5
    },
    paddingHorizontal_10 : {
        paddingHorizontal    : 10
    },
    paddingHorizontal_15 : {
        paddingHorizontal    : 15
    },
    paddingHorizontal_20 : {
        paddingHorizontal    : 20
    },
    paddingHorizontal_25 : {
        paddingHorizontal    : 25
    },
    paddingHorizontal_30 : {
        paddingHorizontal    : 30
    },

    // Style Border Radius

    Radius_5 : {
        borderRadius        : 5
    },
    Radius_10 : {
        borderRadius        : 10
    },
    Radius_15 : {
        borderRadius        : 15
    },
    Radius_20 : {
        borderRadius        : 20
    },
    Radius_30 : {
        borderRadius        : 30
    },
    Radius_40 : {
        borderRadius        : 40
    },
    Radius_50 : {
        borderRadius        : 50
    },
    Radius_60 : {
        borderRadius        : 60
    },
    Radius_70 : {
        borderRadius        : 70
    },
    Radius_80 : {
        borderRadius        : 80
    },
    Radius_90 : {
        borderRadius        : 90
    },
    Radius_100 : {
        borderRadius        : 100
    },

    // Background Color

    bg_gray : {
        backgroundColor                 : COLORS.gray
    },
    bg_light_gray : {
        backgroundColor                 : COLORS.light_gray
    },
    bg_red : {
        backgroundColor                 : COLORS.red
    },
    bg_pink : {
        backgroundColor                 : COLORS.pink
    },
    bg_black : {
        backgroundColor                 : COLORS.black
    },
    bg_White : {
        backgroundColor                 : '#FFF'
    },
    bg_overlay : {
        backgroundColor                 : "rgba(250, 218, 208, 0.9)"
    },
    overlay_white : {
        backgroundColor                 : "rgba(255, 255, 255, 0.5)"
    },
    overlay_black : {
        backgroundColor                 : "rgba(0, 0, 0, 0.5)"
    },

    // Style Border

    Border : {
      borderWidth                 : 1,
    },
    Border_2 : {
        borderWidth               : 2,
    },
    BorderNone : {
        borderWidth               : 0,
    },
    border_gray : {
        borderColor               : COLORS.gray
    },
    border_light_gray : {
        borderColor               : COLORS.light_gray
    },
    border_red : {
        borderColor               : COLORS.red
    },
    border_pink : {
        borderColor               : COLORS.pink
    },
    border_black : {
        borderColor               : COLORS.black
    },
    border_White : {
        borderColor               : '#FFF'
    },
    border_top : {
        borderTopWidth            : 6,
        borderTopColor            : COLORS.gray
    },
    border_bottom : {
        borderBottomWidth         : 6,
        borderBottomColor         : COLORS.gray
    },
    border_right : {
        borderRightWidth          : 6,
        borderRightColor          : COLORS.gray
    },
    border_left : {
        borderLeftWidth           : 6,
        borderLeftColor           : COLORS.gray
    },
    borderRed : {
        borderLeftWidth           : 4,
        borderLeftColor           : COLORS.gray,
        borderTopWidth            : 1,
        borderBottomWidth         : 1,
        borderRightWidth          : 1,
        borderTopColor            : COLORS.gray,
        borderBottomColor         : COLORS.gray,
        borderRightColor          : COLORS.gray,
    },
    borderBlack : {
        borderLeftWidth           : 4,
        borderLeftColor           : COLORS.black,
        borderTopWidth            : 1,
        borderBottomWidth         : 1,
        borderRightWidth          : 1,
        borderTopColor            : COLORS.gray,
        borderBottomColor         : COLORS.gray,
        borderRightColor          : COLORS.gray,
    },

    // Style Shadow

    boxShadow : {
        shadowColor             : "#363636",
        shadowOffset            : { width: 0, height: 0.5},
        shadowOpacity           : 0.10,
        shadowRadius            : 2.0,
        elevation               : 2,
    },

    // Styles Flex Box

    flexCenter : {
        alignItems          : 'center',
        justifyContent      : 'center',
        alignSelf           : 'center',
    },
    bottomCenter : {
        alignItems          : 'flex-end',
        justifyContent      : 'flex-end',
        alignSelf           : 'center',
    },
    topCenter : {
        alignItems          : 'flex-start',
        justifyContent      : 'flex-start',
        alignSelf           : 'center',
    },
    centerContext : {
        alignItems          : 'center',
        justifyContent      : 'center',
    },
    SelfCenter : {
        alignSelf           : 'center'
    },
    SelfRight : {
        alignSelf           : 'flex-end',
        alignItems          : 'center',
        flexDirection       : "row",
    },
    SelfLeft : {
        alignSelf           : 'flex-start',
        alignItems          : 'center',
        flexDirection       : "row",
    },
    flexRight : {
        alignSelf           : 'flex-end',
        alignItems          : 'center',
    },
    flexLeft : {
        alignSelf           : 'flex-start',
        alignItems          : 'center',
    },
    scroll: {
        flexDirection       : 'row',
        alignSelf           : 'flex-start',
    },
    row : {
        flexDirection       : 'row',
    },
    rowGroup : {
        flexDirection       : "row",
        justifyContent      : "space-between",
        alignItems          : "center",
        flexWrap            : 'wrap'
    },
    rowCenter : {
        flexDirection       : "row",
        alignSelf           : 'center',
        justifyContent      : "center",
        alignItems          : "center",
        flexWrap            : 'wrap'
    },
    rowRight : {
        flexDirection       : "row",
        alignSelf           : 'flex-start',
        alignItems          : "center",
        justifyContent      : 'center',
        flexWrap            : 'wrap'
    },
    rowLeft : {
        flexDirection       : "row",
        alignSelf           : 'flex-end',
        alignItems          : "center",
        justifyContent      : 'center',
        flexWrap            : 'wrap'
    },
    bgFullWidth : {
        flexGrow            : 1,
    },
    flex_1 : {
        flex                : 1
    },
    flex_2 : {
        flex                : 2
    },
    flex_10 : {
        flexBasis           : '10%'
    },
    flex_15 : {
        flexBasis           : '15%'
    },
    flex_20 : {
        flexBasis           : '20%'
    },
    flex_25 : {
        flexBasis           : '25%'
    },
    flex_30 : {
        flexBasis           : '30%'
    },
    flex_33 : {
        flexBasis           : '33.3%'
    },
    flex_40 : {
        flexBasis           : '40%'
    },
    flex_45 : {
        flexBasis           : '45%'
    },
    flex_50 : {
        flexBasis           : '50%'
    },
    flex_60 : {
        flexBasis           : '60%'
    },
    flex_70 : {
        flexBasis           : '70%'
    },
    flex_75 : {
        flexBasis           : '75%'
    },
    flex_80 : {
        flexBasis           : '80%'
    },
    flex_85 : {
        flexBasis           : '85%'
    },
    flex_90 : {
        flexBasis           : '90%'
    },
    flex_100 : {
        flexBasis           : '100%'
    },

    // Width

    Width_45 : {
        width                       : '45%'
    },
    Width_46 : {
        width                       : '46%'
    },
    Width_47 : {
        width                       : '47%'
    },
    Width_50 : {
        width                       : '50%'
    },
    Width_70 : {
        width                       : '70%'
    },
    Width_80 : {
        width                       : '80%'
    },
    Width_85 : {
        width                       : '85%'
    },
    Width_90 : {
        width                       : '90%'
    },
    Width_95 : {
        width                       : '95%'
    },
    Width_100 : {
        width                       : '100%'
    },
    width_40 : {
        width                       : 40
    },
    width_50 : {
        width                       : 50
    },
    width_70 : {
        width                       : 70
    },
    width_80 : {
        width                       : 80
    },
    width_90 : {
        width                       : 90
    },
    width_100 : {
        width                       : 100
    },
    width_150 : {
        width                       : 150
    },
    width_120 : {
        width                       : 120
    },
    width_130 : {
        width                       : 130
    },
    width_200 : {
        width                       : 200
    },

    // Style position

    position_R : {
        position                    : 'relative',
    },
    position_A : {
        position                    : 'absolute',
    },
    zIndex : {
        zIndex                      : 999,
    },
    zIndexDown : {
        zIndex                      : -1,
    },
    fixItem : {
        bottom                      : -60,
        right                       : -10
    },
    top_0 : {
        top                         : 0
    },
    top_5 : {
        top                         : 5
    },
    top_10 : {
        top                         : 10
    },
    top_15 : {
        top                         : 15
    },
    top_20 : {
        top                         : 20
    },
    top_25 : {
        top                         : 25
    },
    top_30 : {
        top                         : 30
    },
    top_35 : {
        top                         : 35
    },
    top_40 : {
        top                         : 40
    },
    top_45 : {
        top                         : 45
    },
    bottom_0 : {
        bottom                      : 0
    },
    bottom_10 : {
        bottom                      : 10
    },
    bottom_20 : {
        bottom                      : 20
    },
    bottom_30 : {
        bottom                      : 30
    },
    bottom_40 : {
        bottom                      : 40
    },
    right_0 : {
        right                       : 0
    },
    right_5 : {
        right                       : 5
    },
    right_10 : {
        right                       : 10
    },
    right_15 : {
        right                       : 15
    },
    right_20 : {
        right                       : 20
    },
    right_25 : {
        right                       : 25
    },
    right_30 : {
        right                       : 30
    },
    right_35 : {
        right                       : 35
    },
    left_0 : {
        left                        : 0
    },
    left_5 : {
        left                        : 5
    },
    left_10 : {
        left                     : 10
    },
    left_15 : {
        left                     : 15
    },
    left_20 : {
        left                     : 20
    },
    left_25 : {
        left                     : 25
    },
    left_30 : {
        left                     : 30
    },
    left_35 : {
        left                     : 35
    },

    // Height

    height_10 : {
        height                  : 10
    },
    height_20 : {
        height                  : 20
    },
    height_30 : {
        height                  : 30
    },
    height_40 : {
        height                  : 40
    },
    height_45 : {
        height                  : 45
    },
    height_50 : {
        height                  : 50
    },
    height_60 : {
        height                  : 60
    },
    height_70 : {
        height                  : 70
    },
    height_80 : {
        height                  : 80
    },
    height_90 : {
        height                  : 90
    },
    height_100 : {
        height                  : 100
    },
    height_120 : {
        height                  : 120
    },
    height_150 : {
        height                  : 150
    },
    height_170 : {
        height                  : 170
    },
    height_200 : {
        height                  : 200
    },
    height_250 : {
        height                  : 250
    },
    height_full : {
        height                  : '100%'
    },
    Height_90 : {
        height                  : '90%'
    },
    minHeight : {
        minHeight               :  150
    },


    //  Style For App

    windowWidth : {
        paddingVertical     : 30,
        width               : '100%',
        height              : '100%',
    },
    bgContent : {
        width               : null,
        height              : null,
        flex                : 1,
    },
    overHidden : {
        overflow             : 'hidden'
    },

    //  Style Input

    item : {
        width               : "100%",
        marginLeft          : 0,
        marginRight         : 0,
        marginVertical      : 10,
        padding             : 0,
        paddingTop          : 0,
        paddingBottom       : 0,
        borderBottomWidth   : 0,
    },
    label : {
        borderWidth         : 0,
        padding             : 0,
        top                 : 0,
        zIndex              : 99,
        backgroundColor     : '#ffffff',
        opacity             : 1,
        paddingTop          : 0,
        paddingBottom       : 0,
        position            : 'relative'
    },
    input : {
        borderColor         : COLORS.gray,
        borderWidth         : 1,
        borderRadius        : 50,
        width               : "100%",
        color               : COLORS.red,
        paddingRight        : 40,
        paddingLeft         : 40,
        textAlign           : I18nManager.isRTL ? 'right' : 'left',
        fontFamily          : 'cairo',
        fontSize            : 13,
        top                 : 0,
        height              : 40,
    },
    textArea : {
        borderColor         : COLORS.gray,
        borderWidth         : 1,
        borderRadius        : 2,
        width               : "100%",
        color               : COLORS.red,
        paddingRight        : 20,
        paddingLeft         : 20,
        textAlign           : 'right',
        fontFamily          : 'cairo',
        fontSize            : 13,
        top                 : 0,
    },
    Active : {
        borderWidth           : 1,
        borderColor           : COLORS.red,
    },
    noActive : {
        borderWidth           : 1,
        borderColor           : COLORS.gray,
    },

    // Style Picker

    viewPiker : {
        position            : 'relative',
        backgroundColor     : COLORS.light_gray,
    },
    Picker : {
        width               : '100%',
        writingDirection    : 'rtl',
        borderWidth         : 0,
        paddingLeft         : 0,
        fontSize            : 18,
        backgroundColor     : 'transparent',
        marginRight         : 0,
        borderRadius        : 10,
        height              : 50,
    },
    itemPiker : {
        borderWidth         : 0,
        borderColor         : COLORS.light_gray,
        width               : '100%',
        position            : 'relative',
        fontSize            : 18,
        borderRadius        : 5,
        borderLeftWidth     : 0,
        borderBottomWidth   : 0,
        borderTopWidth      : 0,
        borderRightWidth    : 0
    },
    iconPicker : {
        position            : 'absolute',
        right               : 20,
        color               : COLORS.gray,
        fontSize            : 16
    },

    // Style Img Logo

    shape_logo : {
        width               : 250,
        height              : 250,
        resizeMode          :  "contain"
    },
    logo : {
        width               : 150,
        height              : 150,
        resizeMode          :  "contain"
    },
    iconImg : {
        width               : 50,
        height              : 50,
        resizeMode          :  "contain"
    },
    icImg : {
        width               : 80,
        height              : 80,
        resizeMode          :  "contain"
    },
    sizeImage : {
        width               : 150,
        height              : 150,
        resizeMode          : 'contain'
    },
    minImage : {
        width               : 130,
        height              : 130,
        resizeMode          : 'contain'
    },
    icoImage : {
        width               : 100,
        height              : 100,
        resizeMode          : 'contain'
    },
    smImage : {
        width               : 25,
        height              : 25,
        resizeMode          : 'contain'
    },
    favImage : {
        width               : 15,
        height              : 15,
        resizeMode          : 'contain'
    },
    headImage : {
        width               : 20,
        height              : 20,
        resizeMode          : 'contain'
    },
    iconBank : {
        width               : 35,
        height              : 35,
        resizeMode          : 'contain'
    },

    //  Style Header

    headerView : {
        backgroundColor     : COLORS.gray,
        zIndex              : 99,
        paddingTop          : 0,
        paddingRight        : 0,
        paddingLeft         : 0,
        elevation           : 0,
        borderBottomWidth   : 0,
        alignItems          : 'center',
        height              : 95,
    },
    bodyText : {
        position            : 'relative',
        alignItems          : 'center',
        flex                : 1,
    },
    leftIcon : {
        flex                : 0,
        transform           : I18nManager.isRTL ? [{ rotate: '0deg' }] : [{ rotate: '180deg' }],
    },
    rightIcon : {
        flex                : 0
    },
    Button : {
        paddingRight        : 10,
        paddingLeft         : 10,
        paddingBottom       : 0,
        paddingTop          : 0
    },

    // Style CheckBox

    checkBox : {
        paddingLeft             : 0,
        paddingBottom           : 0,
        borderRadius            : 3,
        paddingRight            : 2
    },

    // Style Drawer

    drawerItemStyle: {
        paddingHorizontal       : 20,
        marginVertical          : 10,
    },

    // Style Swiper

    swiper : {
        height                  : 100,
    },
    viewBlock : {
        position                :  "relative",
    },
    blockContent : {
        position                : 'absolute',
        zIndex                  : 999,
        left                    : 0,
        top                     : 7,
        backgroundColor         : "rgba(211, 41, 42,0.3)",
    },
    paginationStyle : {
        flexDirection           : 'column',
        position                : 'absolute',
        left                    : '98%',
        zIndex                  : 999,
        top                     : 40,
        width                   : 20
    },

    // For App

    activeTabs : {
        backgroundColor     : '#f00',
    },
    noActiveTabs : {
        backgroundColor     : COLORS.light_gray,
    },
    starStyle:{
        marginHorizontal    : 1,
    },
    rotatTouch : {
        transform           : [{ rotate: '50deg' }],
    },
    rotatIcon : {
        transform           : [{ rotate: '-50deg' }],
    },
    shapeBlock : {
        top                 : -10,
        left                : -10,
    },

    // Tabs Styles

    view_Footer : {
        height                  : 50,
        borderTopLeftRadius     : 0,
        borderTopRightRadius    : 0,
        borderTopWidth          : 0,
        backgroundColor         : "#FFF",
        shadowColor             : "#363636",
        shadowOffset            : { width: 0, height: 1},
        shadowOpacity           : 0.22,
        shadowRadius            : 2.22,
        elevation               : 3,
    },
    footer_Tab  : {
        height                  : 50,
        borderTopLeftRadius     : 0,
        borderTopRightRadius    : 0,
        borderTopWidth          : 0,
        backgroundColor         : "#74255c",
        // shadowColor             : "#363636",
        // shadowOffset            : { width: 0, height: 1},
        // shadowOpacity           : 0.22,
        shadowRadius            : 2.22,
        elevation               : 2,
    },

});

export default styles;
