export class Destination {
    id: string;
    name: string;
    slug: string;
}

export class Bus {
    line: string;
    destinations: Destination[];
}
