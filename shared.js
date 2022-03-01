// import { BehaviorSubject } from 'rxjs';


class SharedService {
    value = 'Initial value';
    // subject = new BehaviorSubject(123);
    setValue(value) {
        this.value = value;
    }
    getValue() {
        console.log("Get Value", this.value)
    }
}
export default SharedService;