function myPromise(constructor) {
    let self = this;
    self.status = 'pending';
    self.value = undefined;
    self.reason = undefined;
    function resolve(value) {
        if(self.status === "pending") {
            self.value = value;
            self.status = 'resolved';
        }
    }
    function reject(reason) {
        if(self.status === 'pending') {
            self.reason = reason;
            self.status = 'reject';
        }
    }
    try {
        constructor(resolve, reject)
    } catch(e) {
        reject(e)
    }
}

myPromise.prototype.then = function (onFullfilled, onRejected) {
    let self =this;
    switch (self.status) {
        case "resolved":
            onFullfilled(self.value);
            break;
        case "rejected":
            onRejected(self.reason);
            break;
        default:
    }
};

const p = new myPromise(function (resolve, reject) {
    resolve(1);
    reject(10);
});
p.then(function (x) {
    console.log(x, 'aa');
}, function (x) {
    console.log(x,'as');
});
