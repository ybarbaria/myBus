    export class Destination {
        id_destination: string;
        name: string;
        slug: string;
    }

    export class Station {
        id_station: string;
        name: string;
        slug: string;
    }

    export class Informations {
        destination: Destination;
        line: string;
        type: string;
        station: Station;
    }

    export class Schedule {
        destination: string;
        message: string;
    }

    export class Response {
        informations: Informations;
        schedules: Schedule[];
    }

    export class Meta {
        version: string;
        date: Date;
        call: string;
    }

