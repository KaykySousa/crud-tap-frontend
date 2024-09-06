export interface IUser {
	id: number
	name: string
	age: number
	gender: string
	address: IAddress
}

export interface IAddress {
	street: string
	city: string
	state: string
	postalCode: string
}
