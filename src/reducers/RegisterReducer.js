const INITIAL_STATE = { register : [] , loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'register':{
            return {
                register    : action.payload,
                loader      : action.payload.status == 1 ? true : false
            };
        }

        default:
            return state;
    }
};
