import {PersonController} from "./controller/PersonController"
import {ProfessionController} from "./controller/ProfessionController";

export const Routes = [
    {
        method: "get",
        route: "/persons",
        controller: PersonController,
        action: "all"
    }, {
        method: "get",
        route: "/persons/:id",
        controller: PersonController,
        action: "one"
    }, {
        method: "post",
        route: "/persons",
        controller: PersonController,
        action: "save"
    }, {
        method: "delete",
        route: "/persons/:id",
        controller: PersonController,
        action: "remove"
    }, {
        method: "put",
        route: "/persons/:id",
        controller: PersonController,
        action: "edit"
    },
    {
        method: "get",
        route: "/professions",
        controller: ProfessionController,
        action: "all"
    }, {
        method: "get",
        route: "/professions/:id",
        controller: ProfessionController,
        action: "one"
    }, {
        method: "post",
        route: "/professions",
        controller: ProfessionController,
        action: "save"
    }, {
        method: "delete",
        route: "/professions/:id",
        controller: ProfessionController,
        action: "remove"
    }
]