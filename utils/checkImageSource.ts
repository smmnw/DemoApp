export const getImageSourceFromString = (pathString: string) => {
    if (pathString.startsWith('file://') || pathString.startsWith('http://') || pathString.startsWith('https://') || pathString.startsWith('data:')) {
        return {uri: pathString};
    } else {
        switch (pathString) {
            case 'apple':
            return require("../assets/images/apple.jpg");
            case 'banana':
            return require("../assets/images/banana.jpg");
            case 'avocado':
                return require("../assets/images/avocado.jpg");
            case 'broccoli':
                return require("../assets/images/broccoli.jpg");
            case 'carrot':
                return require("../assets/images/carrot.jpg");
            default:
                return
        }

    }
}