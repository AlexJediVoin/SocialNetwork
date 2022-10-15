import {UserType} from "../Redux/users-reducer";

export const updateObjInArray = (
    users: {
        items: Array<UserType>,
    },
    itemId: number,
    objPropName: keyof UserType,
    newObjProps: Partial<UserType>
) => {
    return {
        items: users.items.map(u => {
            if (u[objPropName] === itemId) {
                return {...u, ...newObjProps};
            }
            return u;
        })
    }
}