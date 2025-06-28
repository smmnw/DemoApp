export type Meal= {
    id:string;
    name: string;
    weight_g: number;
    calories_kcal: number;
    protein_g: number;
    carbo_g: number;
    fat_g: number;
    img: string; // The 'require' statement resolves to a string path/URL for the image
}