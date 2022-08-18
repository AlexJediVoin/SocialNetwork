export const required = (value: string) => {
    return value ? undefined : "Field is required!!!";
};

export const maxLenghtCreator = (maxLenght: number) => (value: string) => {
    return (value && value.length > maxLenght) ? `Max lenght is ${maxLenght} symbols!!!` : undefined;
};
