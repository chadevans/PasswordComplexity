# Password Strength Gage

Provides a password strength indicator to help your application users to make their passwords sufficiently complex.

## Contributing

For more information on contributing to this repository visit [Contributing to a GitHub repository](https://world.mendix.com/display/howto50/Contributing+to+a+GitHub+repository)!

## Typical usage scenario

Typical usage is to use in the context of the Administration module, for the new account form and change password form. Default settings typically encourage passwords of around 12 characters with a mix of upper, lower, numbers, and special characters.

For passwords that are intended to be 8 characters, a common setting is to set Strength Factor to 4, and Increase Strength to No.

## Styling the control

The key classes for styling are using the Bootstrap Progress Bar classes. The heirarchy is:

.passwordcomplexity .progress .progress-bar (.progress-bar-success|.progress-bar-danger)

## Dependencies

1. jQuery 1.11.2
2. (jQuery Complexify)[http://github.com/danpalmer/jquery.complexify.js] 0.5.1