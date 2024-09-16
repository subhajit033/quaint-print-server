const denyProductHtml = (message) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <title>Signature</title>
</head>
<body style="margin: 0; padding: 0; width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center; background-color: grey;box-sizing: border-box;">
    
    <main style="height: 200px; width: 700px; background-color: #fff; box-sizing: border-box; overflow: hidden; font-family:Arial, Helvetica, sans-serif;">
        <section style="height: 100%; width: 100%;">
           ${message}
        <div style="height: 88%;  padding: .25rem 1rem; display: flex; justify-content: space-between;"> 
            <!-- left content side -->
            <div style="width: 65%;">
                <hgroup  style="border-bottom: 3px solid #b4b4b4 ; margin-bottom: .25rem; width: 80%;">
                    <h2 style="margin: 0; width: fit-content; color: #0066F9; font-size: 2rem;">Yashwant Gosavi</h2>
                    <h5 style="margin: 0;margin-bottom: .25rem; width: fit-content; font-size: 1.25rem;">Manager &amp; Designer</h5>
                   
                </hgroup>
                <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: .5rem;">
                    <li style="display: flex; align-items: center; gap: 1rem;"><i style="color: #4c7fc5; font-size: 1.25rem; width: 1.5rem;" class="fa-regular fa-envelope"></i> <a href="mailto:info@yashwebdesign.com" style="color: #636363; font-weight: 700; letter-spacing: 1px; text-decoration: none;">info@yashwebdesign.com</a></li>

                    <li style="display: flex; align-items: center; gap: 1rem;"><i style="color: #4c7fc5; font-size: 1.25rem; width: 1.5rem;" class="fa-solid fa-link"></i> 
                        <a style="color: #636363; font-weight: 700; letter-spacing: 1px; text-decoration: none;" href="https://www.yashwebdesign.com/">https://www.yashwebdesign.com/</a></li>

                    <li style="display: flex; align-items: center; gap: 1rem;">
                        <i style="color: #4c7fc5; font-size: 1.25rem; width: 1.5rem;" class="fa-brands fa-linkedin-in " ></i>
                       <a style="color: #636363; font-weight: 700;  text-decoration: none;" href="https://www.linkedin.com/in/yash-webdesign/">https://www.linkedin.com/in/yash-webdesign/</a></li>
                    <li style="display: flex; align-items: center; gap: 1rem;"><i style="color: #4c7fc5; font-size: 1.25rem; width: 1.5rem;" class="fa-brands fa-instagram"></i>
                        <a style="color: #636363; font-weight: 700; letter-spacing: 1px; text-decoration: none;" href="https://www.Instagram.com/yash_webdesign/">https://www.Instagram.com/yash_webdesign/</a></li>
                </ul>
            </div>
            <!-- right image side -->
            <div style="display: flex; justify-content: center; align-items: center; width: 32%;"><img style="width: 100% ;" src="https://www.yashwebdesign.com/media/svg/logoBlue.svg" alt=""></div> 
        </div>
            <!-- bottom patch -->
        <div style="height: 8%; width: 100%; background-color: #0066F9;"></div>
        </section>
    </main>
    
</body>
</html>`;

module.exports = { denyProductHtml };
