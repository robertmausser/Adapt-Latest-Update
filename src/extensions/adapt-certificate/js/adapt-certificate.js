define([
    'core/js/adapt',
    '../libraries/pdfmake.min.js'
], function (Adapt, pdfMake) {


    $("body").on('click', '.js-generate-certificate', function () {
        var certConfig = Adapt.course.get('_certificate');

        var course = Adapt.course.get("displayTitle");
        var name = Adapt.offlineStorage.get('learnerinfo').name;
        var date = (new Date()).toLocaleDateString("en-GB");

        // var date = new Date();
        // const monthNames = ["January", "February", "March", "April", "May", "June",
        //     "July", "August", "September", "October", "November", "December"
        // ];


        // var month = monthNames[date.getMonth()];
        // var day = new Date(date).getDate();
        // var year = new Date(date).getFullYear();

        // var dateString = `${month} ${day}, ${year}`;


        // var domain = document.location.origin;
        // var popup = window.open("assets/certificate.html", "bob");
        var canvas = $('<canvas id="target" width="1200" height="927"></canvas>')[0];
        var ctx = canvas.getContext('2d');
        var imageObj = new Image();
        canvas.width = certConfig._certificateWidth;
        canvas.height = certConfig._certificateHeight;
        imageObj.src = certConfig._certificateFilePath;
        imageObj.onload = function () {
            ctx.drawImage(imageObj, 0, 0);
            ctx.font = "30pt Calibri";
            ctx.textAlign = "center";
            ctx.fillText(name, certConfig._xPosition, certConfig._namePositionHeight);
            // ctx.textAlign="center";
            // ctx.fillText(message.course, message._xPosition, message._coursePositionHeight);
            ctx.font = "18pt Calibri";
            ctx.textAlign = "center";
            ctx.fillText(date, certConfig._xPosition, certConfig._datePositionHeight);

            downloadPDF(canvas);
        };
    })
    // var message = _.extend(certConfig, {
    //     "course": course,
    //     "name": name,
    //     "date": date
    // });

    // window.addEventListener('message', function() {
    //     popup.postMessage(message, domain);
    // });
    function popupWindow(url, windowName, win, w, h) {
        const y = win.top.outerHeight / 2 + win.top.screenY - (h / 2);
        const x = win.top.outerWidth / 2 + win.top.screenX - (w / 2);
        return win.open(url, windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
    }
    function downloadPDF(canvas) {
        var data = canvas.toDataURL();
        var docDefinition = {
            pageOrientation: 'landscape',
            pageSize: 'A4',
            content: [{
                image: data,
                width: 900
            }]
        };
        pdfMake.createPdf(docDefinition).download("certificate.pdf");
    }


});