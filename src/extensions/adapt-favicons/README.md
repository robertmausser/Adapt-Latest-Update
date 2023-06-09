# adapt-favicons  
    
**Favicons** is an *extension* intended to be used with the [Adapt framework] (https://github.com/adaptlearning/adapt_framework) and the   
[Adapt authoring tool] (https://github.com/adaptlearning/adapt_authoring). It creates links in the page head to icon images, including favicon.  

##Installation

* To install in the Adapt framework:  
With the [Adapt CLI](https://github.com/adaptlearning/adapt-cli) installed, run the following from the command line:  
`adapt install adapt-favicons`

    Alternatively, this component can also be installed by adding the following line of code to the *adapt.json* file:  
    `"adapt-favicons": "*"`  
    Then running the command:  
    `adapt install`  
    (This second method will reinstall all plug-ins listed in *adapt.json*.)  

* To install in the Adapt authoring tool:  
Download **Favicons** using the "Download ZIP" button in the **Favicons** GitHub repository. Upload the zipped archive using the authoring tool's [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).  

## Usage  

### Which icon  

Configure one or more types of icons: favicon, apple-touch, android-chrome. With many generators available online, creating icons is easy. If you need a suggestion, try [RealFaviconGenerator.net](http://RealFaviconGenerator.net). The html file it generates for your icons is a handy reference to use during configuration. Do not assume that all possible icons need to be used. Use only those that make sense for your project.   

Not sure which icons you need? Check out these resources:  
- [Real Favicon Generator: FAQ](http://realfavicongenerator.net/faq)  
- [CSS-Tricks: Favicon Quiz](https://css-tricks.com/favicon-quiz/)  
- [Wikipedia: Favicon](https://en.wikipedia.org/wiki/Favicon)
- [iOS Developer Library: Safari Web Content Guide](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)  

Think this is more complicated than it needs to be? So does W3C. Here's the [W3C Recommendation](https://www.w3.org/TR/html5/links.html#rel-icon) for using "any" with "sizes" and a scalable icon such as an SVG image.

### Placing icons at the site root  

For years, favicons have been placed in the site root and unaccompanied by HTML that identifies them. This relies on properly named files and browsers looking in the root for them. This technique still works. [It is discouraged by the W3C](https://www.w3.org/2005/10/howto-favicon) 
- With the Adapt framework, you have control over image file names and where they are stored. If you are storing your favicons and other properly named icons in the root and are not adding any links, there is little reason to use this extension.
- With the Adapt authoring tool, you cannot control where images assets are stored. Assets are renamed with a dynamically generated string, so you cannot control their names. In order to place icons at the root, you will need to manipulate the content after downloading. And if doing so, there is little reason to use this extension. 

### Some example configurations

| Icon | Rel | Type | Sizes |  
|:-----|:----|:-----|:-----|  
| favicon.ico | shortcut icon | image/x-icon | *n/a* |  
| favicon-16x16.png* | icon | image/png | 16x16 |  
| favicon-32x32.png* | icon | image/png | 32x32 |  
| apple-touch-icon.png*  | apple-touch-icon | *n/a* | *n/a* |  
| apple-touch-icon-60x60.png*  | apple-touch-icon | *n/a* | 60x60 |  
| apple-touch-icon-152x152.png*  | apple-touch-icon | *n/a* | 152x152 |  
\* *specific file names are necessary only if storing at root with no link* 


## Settings Overview

The attributes listed below are used in *course.json* to configure **Favicons**, and are properly formatted as JSON in [*example.json*](https://github.com/chucklorenz/adapt-favicons/blob/master/example.json). Visit the [**Favicon** wiki](https://github.com/chucklorenz/adapt-favicons/wiki) for more information about how they appear in the [authoring tool](https://github.com/adaptlearning/adapt_authoring/wiki). 

The attributes below accommodate some rare use cases. For example, currently only Firefox requires `"image/svg+xml"` as the mime-type for SVG favicons. It should not be construed from this that *all* browsers support SVG favicons&mdash;they don't.

### Attributes

**_favicons** (object): The Favicons object that contains values for **_src**, **_rel**, **_type**,  and **_sizes**.  

>**_src** (string): This is the path to the favicon image, e.g., `"course/en/images/icons/icon-apple-touch-152x152.png"`.  

>**_rel** (string): The value of the 'rel' attribute is typically one of the following: `"icon"`, `"apple-touch-icon"`, `"apple-touch-icon-precomposed"`, `"shortcut icon"`, `"mask-icon"`.  

>**_type** (string):  The mime type for icons is based on the file format of the favicon. For PNG, use `"image/png"`. For GIF, use `"image/gif"`. For ICO, use `"image/x-icon"` (or `"image/vnd.microsoft.icon"`). For SVG, use `"image/svg+xml"`. The value you provide here is simply transferred to the 'rel' attribute; no validation is done.

>**_sizes** (string): The dimension of the favicon, e.g., `"152x152"`. This optional attribute is used in conjunction with `"apple-touch-icon"`.

<div float align=right><a href="#top">Back to Top</a></div>

## Limitations
 
"mstile" and its meta tag are not yet been implemented.  

----------------------------  
**Version number:**  0.0.1  
**Framework versions:** ^2.0      
**Author / maintainer:** Chuck Lorenz  
**Accessibility support:** NA   
**RTL support:** NA  
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), IE 11, IE10, IE9, IE8, IE Mobile 11, Safari for iPhone (iOS 7+8), Safari for iPad (iOS 7+8), Safari 8, Opera    
