angular.module('app').controller('vinNotifyController', vinNotifyController);

vinNotifyController.$inject = ['$scope', 'vinNotify'];
function vinNotifyController($scope, vinNotify) {
    $scope.alertNotify = function () {
        vinNotify.alert({
            size: "xs",
            title: "custom alert",
            message: "alert박스 성공하였습니다.alert박스 성공하였습니다. alert박스 성공하였습니다.alert박스 성공하였습니다."
        }, function () {
            console.log("close");
        });
    }

    $scope.confirmNotify = function () {
        vinNotify.confirm({
            size: "xs",
            title: "custom confirm",
            message: "confirm박스 yes or no 선택해"
        }, function () {
            console.log("yes");
        }, function () {
            console.log("no");
        });
    }

    $scope.errorNotify = function () {
        vinNotify.error({
            size: "xs",
            title: "custom error custom error custom error custom error custom error custom error",
            message: "error박스 성공하였습니다.",
        }, function () {
            console.log("close");
        });
    }
    
    $scope.alertNotifyOnStyle = function () {
        vinNotify.alert({
            title: "ng style alert",
            message: "강제스타일 옵션 제공",
            style: {
                width: 250,
                height: 550,
                opacity: 0.5
            }
        }, function () {
            console.log("close");
        });
    }
}