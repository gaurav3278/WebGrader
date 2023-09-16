/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"img.icons8.com",
                pathname:"/**",
                port:""
            },
            {
                protocol:"https",
                hostname:"www.flaticon.com",
                pathname:"/**",
                port:""
            }
        ]
    }
}

module.exports = nextConfig
