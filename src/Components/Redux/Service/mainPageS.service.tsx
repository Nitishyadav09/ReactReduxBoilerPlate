import { API } from "../../api-services";
import { ID } from "../../utils/commonInterfaces";

const url = "capsules";
export default {
    get () {
        return API.get( url);
    }
};
