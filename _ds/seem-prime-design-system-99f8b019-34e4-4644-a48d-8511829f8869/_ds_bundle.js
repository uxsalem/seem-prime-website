/* @ds-bundle: {"format":4,"namespace":"SEEMPRIMEDesignSystem_99f8b0","components":[{"name":"AccentRule","sourcePath":"components/brand/AccentRule.jsx"},{"name":"Eyebrow","sourcePath":"components/brand/Eyebrow.jsx"},{"name":"GlassPanel","sourcePath":"components/brand/GlassPanel.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Divider","sourcePath":"components/core/Divider.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"StatFigure","sourcePath":"components/data/StatFigure.jsx"},{"name":"StepBadge","sourcePath":"components/data/StepBadge.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Breadcrumbs","sourcePath":"components/navigation/Breadcrumbs.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/brand/AccentRule.jsx":"f4c5bdde881f","components/brand/Eyebrow.jsx":"cad10558f3c5","components/brand/GlassPanel.jsx":"7deeb0f2ddd0","components/brand/Logo.jsx":"49920688fc3e","components/brand/Wordmark.jsx":"0f4613d0bd67","components/core/Badge.jsx":"aedcf7e63750","components/core/Button.jsx":"b63d9a4bb95f","components/core/Card.jsx":"eb5878ed648a","components/core/Divider.jsx":"0837bdb25592","components/core/IconButton.jsx":"22f664afdefc","components/core/Tag.jsx":"557fd324a580","components/data/DataTable.jsx":"1da803106155","components/data/StatFigure.jsx":"09c64cfca49b","components/data/StepBadge.jsx":"243c675b6324","components/feedback/Dialog.jsx":"ebbfa37cde6c","components/feedback/Toast.jsx":"0ba7ac481504","components/feedback/Tooltip.jsx":"974b3d840449","components/forms/Checkbox.jsx":"c5ead78b4a47","components/forms/Input.jsx":"a01f005c220c","components/forms/Radio.jsx":"c1313b6037e0","components/forms/Select.jsx":"a6bd3fc3db17","components/forms/Switch.jsx":"ffb6ca23bdb6","components/forms/Textarea.jsx":"ff41f5610341","components/navigation/Breadcrumbs.jsx":"c717e8ed933f","components/navigation/Tabs.jsx":"2decf3c4239f","ui_kits/corporate_site/ApproachScreen.jsx":"d107f416a383","ui_kits/corporate_site/ContactScreen.jsx":"4ebeae27cd87","ui_kits/corporate_site/HomeScreen.jsx":"6a68929824c9","ui_kits/corporate_site/PortfolioScreen.jsx":"bbb5aed0e12b","ui_kits/corporate_site/SiteChrome.jsx":"34d079c76269","ui_kits/investor_portal/DashboardScreen.jsx":"1e1789e75702","ui_kits/investor_portal/LoginScreen.jsx":"3c301ee25ac5","ui_kits/investor_portal/PlatformsScreen.jsx":"2e602d2cd519","ui_kits/investor_portal/PortalShell.jsx":"c282d9f19018","ui_kits/investor_portal/ReportsScreen.jsx":"d4cc52e78d26","ui_kits/investor_portal/SettingsScreen.jsx":"90997a42c9d1"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SEEMPRIMEDesignSystem_99f8b0 = window.SEEMPRIMEDesignSystem_99f8b0 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/AccentRule.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The 3px accent bar that sits above headings and beside active items. */
function AccentRule({
  orientation = 'horizontal',
  tone = 'ember',
  length = 48,
  style,
  ...rest
}) {
  const color = tone === 'green' ? 'var(--green-700)' : tone === 'onBrand' ? 'var(--green-300)' : 'var(--rule-accent)';
  const thick = 'var(--rule-accent-w)';
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true"
  }, rest, {
    style: {
      display: 'block',
      background: color,
      width: orientation === 'horizontal' ? length : thick,
      height: orientation === 'horizontal' ? thick : length,
      ...style
    }
  }));
}
Object.assign(__ds_scope, { AccentRule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/AccentRule.jsx", error: String((e && e.message) || e) }); }

// components/brand/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Letterspaced caps kicker, the brand's standard section opener. */
function Eyebrow({
  children,
  tone = 'accent',
  rule = true,
  style,
  ...rest
}) {
  const color = tone === 'onBrand' ? 'var(--text-on-brand-muted)' : tone === 'muted' ? 'var(--text-muted)' : 'var(--text-accent)';
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      ...style
    }
  }), rule && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 22,
      height: 'var(--hairline)',
      background: tone === 'onBrand' ? 'var(--border-on-brand-strong)' : 'var(--rule-accent)',
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color
    }
  }, children));
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/brand/GlassPanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Frosted glass surface for overlays that sit on imagery. */
function GlassPanel({
  children,
  tone = 'light',
  radius = 'xl',
  padding = 'var(--space-6)',
  style,
  ...rest
}) {
  const dark = tone === 'dark';
  const radii = {
    none: 'var(--radius-square)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    capsule: 'var(--radius-capsule)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      background: dark ? 'var(--surface-glass-dark)' : 'var(--surface-glass)',
      WebkitBackdropFilter: 'var(--blur-glass)',
      backdropFilter: 'var(--blur-glass)',
      border: '1px solid ' + (dark ? 'var(--border-on-brand)' : 'rgba(255,255,255,.55)'),
      borderRadius: radii[radius] || radii.xl,
      boxShadow: 'var(--highlight-top)',
      color: dark ? 'var(--text-on-brand)' : 'var(--text-strong)',
      padding,
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { GlassPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/GlassPanel.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SRC = {
  ink: 'assets/logo-seem-group-mark-ink.png',
  white: 'assets/logo-seem-group-mark-white.png',
  blue: 'assets/logo-seem-group-stamp-blue.png'
};

/** The SEEM GROUP square stamp mark (raster crop of the supplied stamp artwork). */
function Logo({
  tone = 'ink',
  size = 64,
  assetBase = '',
  withWordmark = false,
  style,
  ...rest
}) {
  const base = assetBase ? assetBase.replace(/\/$/, '') + '/' : '';
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: base + SRC[tone],
    alt: "SEEM GROUP",
    width: size,
    height: size,
    style: {
      width: size,
      height: 'auto',
      display: 'block'
    }
  }), withWordmark && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: Math.max(11, Math.round(size * 0.2)),
      letterSpacing: 'var(--tracking-wordmark)',
      textTransform: 'uppercase',
      color: tone === 'white' ? 'var(--text-on-brand)' : 'var(--text-strong)',
      paddingInlineEnd: '0.42em'
    }
  }, "SEEM PRIME"));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/Wordmark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 12,
  md: 16,
  lg: 22,
  xl: 32
};

/** SEEM PRIME wordmark — set in type (no logotype file exists). */
function Wordmark({
  text = 'SEEM PRIME',
  size = 'md',
  tone = 'ink',
  block = false,
  style,
  ...rest
}) {
  const fs = SIZES[size] || SIZES.md;
  const color = tone === 'onBrand' ? 'var(--text-on-brand)' : tone === 'muted' ? 'var(--text-muted)' : 'var(--text-strong)';
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: block ? 'block' : 'inline-block',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-regular)',
      fontSize: fs,
      lineHeight: 1.1,
      letterSpacing: 'var(--tracking-wordmark)',
      textTransform: 'uppercase',
      color,
      paddingInlineEnd: '0.42em',
      whiteSpace: 'nowrap',
      ...style
    }
  }), text);
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONE = {
  neutral: {
    background: 'var(--surface-sunken)',
    color: 'var(--text-body)'
  },
  positive: {
    background: 'var(--status-positive-bg)',
    color: 'var(--green-700)'
  },
  caution: {
    background: 'var(--status-caution-bg)',
    color: 'var(--bronze-600)'
  },
  critical: {
    background: 'var(--status-critical-bg)',
    color: 'var(--ember-600)'
  },
  info: {
    background: 'var(--status-info-bg)',
    color: 'var(--teal-600)'
  },
  onBrand: {
    background: 'rgba(255,255,255,.12)',
    color: '#fff'
  }
};

/** Small status marker. */
function Badge({
  children,
  tone = 'neutral',
  dot = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      padding: '4px var(--space-3)',
      borderRadius: 'var(--radius-capsule)',
      ...TONE[tone],
      ...style
    }
  }), dot && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'currentColor'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZE = {
  sm: {
    height: 'var(--control-h-sm)',
    padding: '0 var(--space-5)',
    fontSize: 'var(--fs-micro)'
  },
  md: {
    height: 'var(--control-h)',
    padding: '0 var(--space-7)',
    fontSize: 'var(--fs-caption)'
  },
  lg: {
    height: 'var(--control-h-lg)',
    padding: '0 var(--space-8)',
    fontSize: 'var(--fs-body-sm)'
  }
};
const VARIANT = {
  primary: {
    background: 'var(--green-900)',
    color: '#fff',
    border: '1px solid var(--green-900)'
  },
  secondary: {
    background: 'var(--surface-card)',
    color: 'var(--text-strong)',
    border: '1px solid var(--border-default)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-accent)',
    border: '1px solid transparent'
  },
  onBrand: {
    background: '#fff',
    color: 'var(--green-950)',
    border: '1px solid #fff'
  },
  onBrandGhost: {
    background: 'transparent',
    color: '#fff',
    border: '1px solid var(--border-on-brand-strong)'
  }
};
const HOVER = {
  primary: {
    background: 'var(--green-950)',
    borderColor: 'var(--green-950)'
  },
  secondary: {
    background: 'var(--surface-card)',
    borderColor: 'var(--border-strong)'
  },
  ghost: {
    background: 'var(--surface-tint)',
    borderColor: 'var(--border-hairline)'
  },
  onBrand: {
    background: 'var(--green-050)',
    borderColor: 'var(--green-050)'
  },
  onBrandGhost: {
    background: 'rgba(255,255,255,.10)',
    borderColor: '#fff'
  }
};

/** Primary interactive control. Capsule, caps label, measured hover lift. */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  disabled = false,
  fullWidth = false,
  as = 'button',
  style,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const Tag = as;
  const v = VARIANT[variant] || VARIANT.primary;
  const h = hover && !disabled ? HOVER[variant] || {} : null;
  const lifted = (variant === 'secondary' || variant === 'onBrand') && hover && !disabled;
  return /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
    disabled: Tag === 'button' ? disabled : undefined,
    "aria-disabled": disabled || undefined,
    onMouseEnter: e => {
      setHover(true);
      onMouseEnter && onMouseEnter(e);
    },
    onMouseLeave: e => {
      setHover(false);
      setPress(false);
      onMouseLeave && onMouseLeave(e);
    },
    onMouseDown: e => {
      setPress(true);
      onMouseDown && onMouseDown(e);
    },
    onMouseUp: e => {
      setPress(false);
      onMouseUp && onMouseUp(e);
    },
    style: {
      display: fullWidth ? 'flex' : 'inline-flex',
      width: fullWidth ? '100%' : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-2)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      textDecoration: 'none',
      borderRadius: 'var(--radius-capsule)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'var(--transition-control)',
      boxShadow: lifted ? 'var(--shadow-raised)' : 'none',
      transform: press && !disabled ? 'var(--press-scale)' : lifted ? 'var(--lift-hover)' : 'none',
      ...SIZE[size],
      ...v,
      ...h,
      ...style
    }
  }), iconLeft, /*#__PURE__*/React.createElement("span", null, children), iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** White hairline card with a wide soft shadow; flips to translucent on green. */
function Card({
  children,
  tone = 'light',
  interactive = false,
  padding = 'var(--space-7)',
  radius = 'lg',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const radii = {
    none: 'var(--radius-square)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    blade: 'var(--radius-blade)'
  };
  const dark = tone === 'onBrand';
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: dark ? 'var(--surface-on-brand)' : 'var(--surface-card)',
      border: '1px solid ' + (dark ? 'var(--border-on-brand)' : 'var(--border-hairline)'),
      borderRadius: radii[radius] || radii.lg,
      boxShadow: dark ? 'none' : hover ? 'var(--shadow-raised)' : 'var(--shadow-card)',
      color: dark ? 'var(--text-on-brand)' : 'var(--text-body)',
      padding,
      transform: hover ? 'var(--lift-hover)' : 'none',
      transition: 'var(--transition-surface)',
      cursor: interactive ? 'pointer' : undefined,
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Divider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** 1px tinted divider; `label` inserts a caps label inline. */
function Divider({
  label,
  tone = 'light',
  spacing = 'var(--space-7)',
  style,
  ...rest
}) {
  const line = tone === 'onBrand' ? 'var(--border-on-brand)' : 'var(--border-hairline)';
  if (!label) {
    return /*#__PURE__*/React.createElement("hr", _extends({}, rest, {
      style: {
        height: 1,
        border: 0,
        background: line,
        margin: spacing + ' 0',
        ...style
      }
    }));
  }
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      margin: spacing + ' 0',
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 1,
      background: line,
      flex: '0 0 22px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: tone === 'onBrand' ? 'var(--text-on-brand-muted)' : 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 1,
      background: line,
      flex: 1
    }
  }));
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Divider.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZE = {
  sm: 34,
  md: 44,
  lg: 54
};

/** Circular icon-only control. Always give it a label. */
function IconButton({
  children,
  label,
  variant = 'secondary',
  size = 'md',
  disabled = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const px = SIZE[size] || SIZE.md;
  const skin = {
    primary: {
      background: 'var(--green-900)',
      color: '#fff',
      border: '1px solid var(--green-900)'
    },
    secondary: {
      background: 'var(--surface-card)',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-default)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-body)',
      border: '1px solid transparent'
    },
    onBrand: {
      background: 'rgba(255,255,255,.10)',
      color: '#fff',
      border: '1px solid var(--border-on-brand)'
    }
  }[variant];
  const hoverSkin = hover && !disabled ? {
    primary: {
      background: 'var(--green-950)'
    },
    secondary: {
      borderColor: 'var(--border-strong)',
      boxShadow: 'var(--shadow-card)'
    },
    ghost: {
      background: 'var(--surface-tint)'
    },
    onBrand: {
      background: 'rgba(255,255,255,.18)'
    }
  }[variant] : null;
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    "aria-label": label,
    title: label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: px,
      height: px,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-capsule)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'var(--transition-control)',
      ...skin,
      ...hoverSkin,
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Sector / filter chip. Selected state uses a green fill, not a pastel block. */
function Tag({
  children,
  selected = false,
  onRemove,
  tone = 'light',
  style,
  ...rest
}) {
  const dark = tone === 'onBrand';
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      font: 'var(--type-body-sm)',
      padding: '6px var(--space-4)',
      borderRadius: 'var(--radius-capsule)',
      background: selected ? 'var(--green-900)' : dark ? 'rgba(255,255,255,.08)' : 'var(--surface-card)',
      color: selected ? '#fff' : dark ? 'var(--text-on-brand)' : 'var(--text-body)',
      border: '1px solid ' + (selected ? 'var(--green-900)' : dark ? 'var(--border-on-brand)' : 'var(--border-default)'),
      transition: 'var(--transition-control)',
      ...style
    }
  }), children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      all: 'unset',
      cursor: 'pointer',
      lineHeight: 1,
      fontSize: 14,
      opacity: 0.7
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Hairline table for stakeholder, portfolio and reporting rows. */
function DataTable({
  columns = [],
  rows = [],
  tone = 'light',
  dense = false,
  caption,
  style,
  ...rest
}) {
  const dark = tone === 'onBrand';
  const line = dark ? 'var(--border-on-brand)' : 'var(--border-hairline)';
  const pad = dense ? 'var(--space-2) var(--space-3)' : 'var(--space-3) var(--space-4)';
  return /*#__PURE__*/React.createElement("table", _extends({}, rest, {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      ...style
    }
  }), caption && /*#__PURE__*/React.createElement("caption", {
    style: {
      captionSide: 'top',
      textAlign: 'start',
      font: 'var(--type-caption)',
      color: dark ? 'var(--text-on-brand-muted)' : 'var(--text-muted)',
      paddingBottom: 'var(--space-3)'
    }
  }, caption), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      textAlign: c.align || 'start',
      padding: pad,
      borderBottom: '1px solid ' + (dark ? 'var(--border-on-brand-strong)' : 'var(--border-default)'),
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: dark ? 'var(--text-on-brand-muted)' : 'var(--text-muted)',
      whiteSpace: 'nowrap'
    }
  }, c.header ?? c)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, ri) => /*#__PURE__*/React.createElement("tr", {
    key: ri
  }, columns.map((c, ci) => {
    const key = c.key ?? ci;
    const val = Array.isArray(r) ? r[ci] : r[key];
    return /*#__PURE__*/React.createElement("td", {
      key: ci,
      style: {
        textAlign: c.align || 'start',
        padding: pad,
        borderBottom: '1px solid ' + line,
        font: c.mono ? 'var(--type-data)' : 'var(--type-body-sm)',
        color: ci === 0 ? dark ? '#fff' : 'var(--text-strong)' : dark ? 'var(--text-body)' : 'var(--text-body)'
      }
    }, val);
  })))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/StatFigure.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZE = {
  md: 'var(--fs-display-3)',
  lg: 'var(--fs-display-2)',
  xl: 'var(--fs-display-1)'
};

/** KPI figure: big light display numeral, caps label, optional accent rule. */
function StatFigure({
  value,
  unit,
  label,
  caption,
  size = 'lg',
  tone = 'light',
  rule = true,
  index,
  style,
  ...rest
}) {
  const dark = tone === 'onBrand';
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      ...style
    }
  }), index && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-data)',
      color: dark ? 'var(--text-on-brand-muted)' : 'var(--text-muted)'
    }
  }, index), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-light)',
      fontSize: SIZE[size] || SIZE.lg,
      lineHeight: 'var(--lh-display)',
      letterSpacing: 'var(--tracking-display)',
      color: dark ? '#fff' : 'var(--text-strong)',
      display: 'flex',
      alignItems: 'baseline',
      gap: '0.18em'
    }
  }, value, unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.42em',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: dark ? 'var(--text-on-brand-muted)' : 'var(--text-muted)'
    }
  }, unit)), rule && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 40,
      height: 'var(--rule-accent-w)',
      background: dark ? 'var(--green-300)' : 'var(--rule-accent)'
    }
  }), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: dark ? 'var(--text-on-brand)' : 'var(--text-strong)'
    }
  }, label), caption && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: dark ? 'var(--text-on-brand-muted)' : 'var(--text-muted)'
    }
  }, caption));
}
Object.assign(__ds_scope, { StatFigure });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatFigure.jsx", error: String((e && e.message) || e) }); }

// components/data/StepBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Soft circular numeral badge — the framework's one neumorphic element. */
function StepBadge({
  children,
  size = 56,
  state = 'default',
  tone = 'light',
  style,
  ...rest
}) {
  const dark = tone === 'onBrand';
  const filled = state === 'active';
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      width: size,
      height: size,
      flex: '0 0 ' + size + 'px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      background: filled ? 'var(--green-900)' : dark ? 'rgba(255,255,255,.08)' : 'var(--silver-100)',
      color: filled ? '#fff' : dark ? 'var(--text-on-brand)' : 'var(--text-strong)',
      boxShadow: dark ? 'none' : state === 'pressed' ? 'var(--shadow-soft-pressed)' : filled ? 'var(--shadow-brand)' : 'var(--shadow-soft)',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-regular)',
      fontSize: Math.round(size * 0.36),
      letterSpacing: 'var(--tracking-heading)',
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { StepBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StepBadge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Modal panel over a green-tinted scrim. */
function Dialog({
  open = false,
  title,
  description,
  children,
  footer,
  onClose,
  width = 520,
  style,
  ...rest
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      background: 'rgba(4,24,21,.52)',
      WebkitBackdropFilter: 'blur(6px)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-6)',
      animation: 'none'
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    "aria-label": typeof title === 'string' ? title : undefined,
    onClick: e => e.stopPropagation()
  }, rest, {
    style: {
      width: '100%',
      maxWidth: width,
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-overlay)',
      border: '1px solid var(--border-hairline)',
      padding: 'var(--space-8)',
      ...style
    }
  }), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-heading-3)',
      color: 'var(--text-strong)',
      margin: '0 0 var(--space-3)'
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-muted)',
      margin: '0 0 var(--space-6)'
    }
  }, description), children, footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 'var(--space-3)',
      marginTop: 'var(--space-8)'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ICONBAR = {
  neutral: 'var(--green-700)',
  positive: 'var(--status-positive)',
  caution: 'var(--status-caution)',
  critical: 'var(--status-critical)'
};

/** Transient confirmation strip. Left accent bar carries the status colour. */
function Toast({
  title,
  message,
  tone = 'neutral',
  onDismiss,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status"
  }, rest, {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-4)',
      minWidth: 280,
      maxWidth: 420,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-overlay)',
      padding: 'var(--space-4) var(--space-5)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 'var(--rule-accent-w)',
      alignSelf: 'stretch',
      background: ICONBAR[tone],
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-heading-4)',
      color: 'var(--text-strong)',
      marginBottom: 2
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-muted)'
    }
  }, message)), onDismiss && /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    "aria-label": "Dismiss",
    style: {
      all: 'unset',
      cursor: 'pointer',
      color: 'var(--text-muted)',
      fontSize: 16,
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Hover/focus hint on a dark green chip. */
function Tooltip({
  label,
  children,
  placement = 'top',
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translate(-50%,-8px)'
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translate(-50%,8px)'
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translate(-8px,-50%)'
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translate(8px,-50%)'
    }
  }[placement];
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false),
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    }
  }), children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      ...pos,
      background: 'var(--green-950)',
      color: '#fff',
      font: 'var(--type-caption)',
      padding: '6px var(--space-3)',
      borderRadius: 'var(--radius-sm)',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      opacity: open ? 1 : 0,
      transition: 'opacity var(--dur-fast) var(--ease-standard)',
      zIndex: 40
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Square checkbox — the mark echoes the square logo, so no rounding. */
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  tone = 'light',
  description,
  id,
  style,
  ...rest
}) {
  const fid = id || React.useId();
  const dark = tone === 'onBrand';
  const isControlled = checked !== undefined;
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : inner;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'flex-start',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    type: "checkbox",
    checked: on,
    disabled: disabled,
    onChange: e => {
      if (!isControlled) setInner(e.target.checked);
      onChange && onChange(e);
    }
  }, rest, {
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  })), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 20,
      height: 20,
      flex: '0 0 20px',
      marginTop: 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-xs)',
      background: on ? 'var(--green-900)' : dark ? 'rgba(255,255,255,.06)' : 'var(--surface-card)',
      border: '1px solid ' + (on ? 'var(--green-900)' : dark ? 'var(--border-on-brand-strong)' : 'var(--border-strong)'),
      color: '#fff',
      fontSize: 12,
      lineHeight: 1,
      transition: 'var(--transition-control)'
    }
  }, on ? '✓' : ''), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-sm)',
      color: dark ? 'var(--text-on-brand)' : 'var(--text-body)',
      display: 'block'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: dark ? 'var(--text-on-brand-muted)' : 'var(--text-muted)'
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function InputShell({
  label,
  hint,
  error,
  required,
  htmlFor,
  tone,
  children,
  style
}) {
  const dark = tone === 'onBrand';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: dark ? 'var(--text-on-brand-muted)' : 'var(--text-muted)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rule-accent)'
    }
  }, " *")), children, (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: error ? 'var(--status-critical)' : dark ? 'var(--text-on-brand-muted)' : 'var(--text-muted)'
    }
  }, error || hint));
}
const baseField = (dark, error, focus) => ({
  height: 'var(--control-h)',
  padding: '0 var(--space-4)',
  font: 'var(--type-body)',
  color: dark ? 'var(--text-on-brand)' : 'var(--text-strong)',
  background: dark ? 'rgba(255,255,255,.06)' : 'var(--surface-card)',
  border: '1px solid ' + (error ? 'var(--status-critical)' : focus ? 'var(--focus-ring)' : dark ? 'var(--border-on-brand)' : 'var(--border-default)'),
  borderRadius: 'var(--radius-md)',
  outline: 'none',
  transition: 'var(--transition-control)',
  width: '100%'
});

/** Single-line text field with caps label, hint and error. */
function Input({
  label,
  hint,
  error,
  required,
  id,
  tone = 'light',
  prefix,
  style,
  wrapperStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || React.useId();
  const dark = tone === 'onBrand';
  return /*#__PURE__*/React.createElement(InputShell, {
    label: label,
    hint: hint,
    error: error,
    required: required,
    htmlFor: fid,
    tone: tone,
    style: wrapperStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      insetInlineStart: 'var(--space-4)',
      color: 'var(--text-muted)',
      display: 'flex'
    }
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    id: fid
  }, rest, {
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      ...baseField(dark, error, focus),
      paddingInlineStart: prefix ? 'var(--space-9)' : 'var(--space-4)',
      ...style
    }
  }))));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Radio choice — circular, green dot when selected. */
function Radio({
  label,
  description,
  name,
  value,
  checked,
  onChange,
  disabled,
  tone = 'light',
  id,
  style,
  ...rest
}) {
  const fid = id || React.useId();
  const dark = tone === 'onBrand';
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'flex-start',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    disabled: disabled,
    onChange: onChange
  }, rest, {
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  })), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 20,
      height: 20,
      flex: '0 0 20px',
      marginTop: 1,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: dark ? 'rgba(255,255,255,.06)' : 'var(--surface-card)',
      border: '1px solid ' + (checked ? 'var(--green-900)' : dark ? 'var(--border-on-brand-strong)' : 'var(--border-strong)'),
      transition: 'var(--transition-control)'
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: 'var(--green-900)'
    }
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-sm)',
      color: dark ? 'var(--text-on-brand)' : 'var(--text-body)',
      display: 'block'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: dark ? 'var(--text-on-brand-muted)' : 'var(--text-muted)'
    }
  }, description)));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SelectShell({
  label,
  hint,
  error,
  required,
  htmlFor,
  tone,
  children,
  style
}) {
  const dark = tone === 'onBrand';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: dark ? 'var(--text-on-brand-muted)' : 'var(--text-muted)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rule-accent)'
    }
  }, " *")), children, (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: error ? 'var(--status-critical)' : dark ? 'var(--text-on-brand-muted)' : 'var(--text-muted)'
    }
  }, error || hint));
}

/** Native select, styled to match Input with a hairline chevron. */
function Select({
  label,
  hint,
  error,
  required,
  id,
  tone = 'light',
  options = [],
  children,
  style,
  wrapperStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || React.useId();
  const dark = tone === 'onBrand';
  return /*#__PURE__*/React.createElement(SelectShell, {
    label: label,
    hint: hint,
    error: error,
    required: required,
    htmlFor: fid,
    tone: tone,
    style: wrapperStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fid
  }, rest, {
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      height: 'var(--control-h)',
      width: '100%',
      padding: '0 var(--space-8) 0 var(--space-4)',
      font: 'var(--type-body)',
      color: dark ? 'var(--text-on-brand)' : 'var(--text-strong)',
      background: dark ? 'rgba(255,255,255,.06)' : 'var(--surface-card)',
      border: '1px solid ' + (error ? 'var(--status-critical)' : focus ? 'var(--focus-ring)' : dark ? 'var(--border-on-brand)' : 'var(--border-default)'),
      borderRadius: 'var(--radius-md)',
      appearance: 'none',
      outline: 'none',
      cursor: 'pointer',
      transition: 'var(--transition-control)',
      ...style
    }
  }), children || options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      insetInlineEnd: 'var(--space-4)',
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: 'var(--text-muted)',
      font: 'var(--type-body-sm)'
    }
  }, "\u25BE")));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Capsule toggle for immediate settings. */
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  tone = 'light',
  id,
  style,
  ...rest
}) {
  const fid = id || React.useId();
  const isControlled = checked !== undefined;
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : inner;
  const dark = tone === 'onBrand';
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      display: 'inline-flex',
      gap: 'var(--space-3)',
      alignItems: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    type: "checkbox",
    role: "switch",
    checked: on,
    disabled: disabled,
    onChange: e => {
      if (!isControlled) setInner(e.target.checked);
      onChange && onChange(e);
    }
  }, rest, {
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  })), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 44,
      height: 24,
      borderRadius: 'var(--radius-capsule)',
      padding: 2,
      background: on ? 'var(--green-900)' : dark ? 'rgba(255,255,255,.16)' : 'var(--silver-300)',
      display: 'inline-flex',
      alignItems: 'center',
      transition: 'background-color var(--dur-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0 1px 2px rgba(4,24,21,.24)',
      transform: on ? 'translateX(20px)' : 'translateX(0)',
      transition: 'transform var(--dur-fast) var(--ease-standard)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-sm)',
      color: dark ? 'var(--text-on-brand)' : 'var(--text-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TextareaShell({
  label,
  hint,
  error,
  required,
  htmlFor,
  tone,
  children,
  style
}) {
  const dark = tone === 'onBrand';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: dark ? 'var(--text-on-brand-muted)' : 'var(--text-muted)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rule-accent)'
    }
  }, " *")), children, (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: error ? 'var(--status-critical)' : dark ? 'var(--text-on-brand-muted)' : 'var(--text-muted)'
    }
  }, error || hint));
}

/** Multi-line text field. */
function Textarea({
  label,
  hint,
  error,
  required,
  id,
  tone = 'light',
  rows = 4,
  style,
  wrapperStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || React.useId();
  const dark = tone === 'onBrand';
  return /*#__PURE__*/React.createElement(TextareaShell, {
    label: label,
    hint: hint,
    error: error,
    required: required,
    htmlFor: fid,
    tone: tone,
    style: wrapperStyle
  }, /*#__PURE__*/React.createElement("textarea", _extends({
    id: fid,
    rows: rows
  }, rest, {
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      padding: 'var(--space-3) var(--space-4)',
      font: 'var(--type-body)',
      color: dark ? 'var(--text-on-brand)' : 'var(--text-strong)',
      background: dark ? 'rgba(255,255,255,.06)' : 'var(--surface-card)',
      border: '1px solid ' + (error ? 'var(--status-critical)' : focus ? 'var(--focus-ring)' : dark ? 'var(--border-on-brand)' : 'var(--border-default)'),
      borderRadius: 'var(--radius-md)',
      outline: 'none',
      resize: 'vertical',
      width: '100%',
      transition: 'var(--transition-control)',
      ...style
    }
  })));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumbs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Path trail using the brand's own '·' separator. */
function Breadcrumbs({
  items = [],
  tone = 'light',
  separator = '·',
  style,
  ...rest
}) {
  const dark = tone === 'onBrand';
  return /*#__PURE__*/React.createElement("nav", _extends({
    "aria-label": "Breadcrumb"
  }, rest, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      flexWrap: 'wrap',
      ...style
    }
  }), items.map((it, i) => {
    const last = i === items.length - 1;
    const label = it.label ?? it;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, it.href && !last ? /*#__PURE__*/React.createElement("a", {
      href: it.href,
      style: {
        font: 'var(--type-caption)',
        color: dark ? 'var(--text-on-brand-muted)' : 'var(--text-muted)',
        textDecoration: 'none',
        borderBottom: 0
      }
    }, label) : /*#__PURE__*/React.createElement("span", {
      "aria-current": last ? 'page' : undefined,
      style: {
        font: 'var(--type-caption)',
        color: last ? dark ? '#fff' : 'var(--text-strong)' : dark ? 'var(--text-on-brand-muted)' : 'var(--text-muted)'
      }
    }, label), !last && /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        color: dark ? 'var(--border-on-brand-strong)' : 'var(--silver-400)',
        font: 'var(--type-caption)'
      }
    }, separator));
  }));
}
Object.assign(__ds_scope, { Breadcrumbs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumbs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Underlined tabs; the active tab carries the 3px accent bar. */
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  tone = 'light',
  style,
  ...rest
}) {
  const isControlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue ?? (items[0] && (items[0].value ?? items[0])));
  const active = isControlled ? value : inner;
  const dark = tone === 'onBrand';
  const pick = v => {
    if (!isControlled) setInner(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist"
  }, rest, {
    style: {
      display: 'flex',
      gap: 'var(--space-7)',
      borderBottom: '1px solid ' + (dark ? 'var(--border-on-brand)' : 'var(--border-hairline)'),
      ...style
    }
  }), items.map(it => {
    const v = it.value ?? it;
    const label = it.label ?? it;
    const on = v === active;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": on,
      onClick: () => pick(v),
      style: {
        all: 'unset',
        cursor: 'pointer',
        position: 'relative',
        padding: '0 0 var(--space-4)',
        font: 'var(--type-label)',
        letterSpacing: 'var(--tracking-label)',
        textTransform: 'uppercase',
        color: on ? dark ? '#fff' : 'var(--text-strong)' : dark ? 'var(--text-on-brand-muted)' : 'var(--text-muted)',
        transition: 'var(--transition-control)'
      }
    }, label, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: 'absolute',
        insetInline: 0,
        bottom: -1,
        height: 'var(--rule-accent-w)',
        background: on ? dark ? 'var(--green-300)' : 'var(--rule-accent)' : 'transparent'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/corporate_site/ApproachScreen.jsx
try { (() => {
const {
  Tabs,
  Card,
  StepBadge,
  Eyebrow,
  DataTable,
  Divider,
  Badge,
  AccentRule,
  Button
} = window.SEEMPRIMEDesignSystem_99f8b0;
const STAGES = {
  Strategy: {
    q: 'Where are we going?',
    inputs: ['Vision & direction', 'Priorities', 'Roadmap'],
    out: 'A clear strategic plan'
  },
  Enablement: {
    q: 'Are we ready to execute?',
    inputs: ['Team & capabilities', 'Technology & systems', 'Governance & processes'],
    out: 'High readiness for execution'
  },
  Execution: {
    q: 'How do we turn plans into reality?',
    inputs: ['Project management', 'Execution control', 'Risk management'],
    out: 'Disciplined execution with high quality'
  },
  Measurement: {
    q: 'Did we achieve the impact?',
    inputs: ['Performance KPIs', 'Reporting', 'Continuous improvement'],
    out: 'Sustainable impact and continuous growth'
  }
};
const VALUES = [['Leadership & Innovation', 'We lead with vision, embrace innovation, and continuously create transformative solutions that shape the future.'], ['Partnership & Trust', 'We build long-term relationships founded on integrity, transparency, collaboration, and mutual success.'], ['Operational Excellence', 'We pursue excellence through disciplined execution, continuous improvement, and world-class operational standards.'], ['Sustainability', 'We create long-term economic, social, and environmental value that supports sustainable growth for future generations.'], ['Results Orientation', 'We are driven by measurable outcomes, accountability, and the delivery of tangible value to our stakeholders.'], ['Responsibility & Governance', 'We uphold the highest standards of ethics, corporate governance, compliance, and responsible decision-making.']];
function ApproachScreen({
  setView
}) {
  const [stage, setStage] = React.useState('Strategy');
  const s = STAGES[stage];
  const keys = Object.keys(STAGES);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: 340,
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/blade-split-green-white.png",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '0 var(--space-8) var(--space-9)',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onBrand"
  }, "Our approach"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-display-2)',
      letterSpacing: 'var(--tracking-display)',
      color: '#fff',
      margin: 'var(--space-4) 0 0',
      maxWidth: '20ch'
    }
  }, "From strategy .. to execution .. to sustainable impact"))), /*#__PURE__*/React.createElement(Section, {
    tone: "light"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "SEEM strategic execution model",
    title: "Four stages, four outputs",
    lead: "Every platform SEEM PRIME develops, operates, or invests in runs through the same four-stage model."
  }), /*#__PURE__*/React.createElement(Tabs, {
    items: keys,
    value: stage,
    onChange: setStage
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '0.8fr 1.2fr',
      gap: 'var(--space-10)',
      marginTop: 'var(--space-8)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      alignItems: 'center'
    }
  }, keys.map(k => /*#__PURE__*/React.createElement(StepBadge, {
    key: k,
    size: 44,
    state: k === stage ? 'active' : 'default'
  }, k[0]))), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-heading-1)',
      color: 'var(--text-strong)'
    }
  }, stage), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-lg)',
      color: 'var(--text-muted)',
      margin: 0
    }
  }, s.q)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
      gap: 'var(--space-5)'
    }
  }, s.inputs.map(i => /*#__PURE__*/React.createElement(Card, {
    key: i,
    padding: "var(--space-6)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-heading-4)',
      color: 'var(--text-strong)'
    }
  }, i))), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-6)",
    tone: "light",
    radius: "blade",
    style: {
      gridColumn: '1 / -1',
      background: 'var(--surface-tint)',
      boxShadow: 'none'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Output"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-heading-2)',
      color: 'var(--text-strong)',
      marginTop: 'var(--space-3)'
    }
  }, s.out))))), /*#__PURE__*/React.createElement(Section, {
    tone: "sunken"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Corporate values",
    title: "Six values, stated as commitments"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
      gap: 'var(--space-6)'
    }
  }, VALUES.map(([t, d], i) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    padding: "var(--space-7)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-data)',
      color: 'var(--text-muted)',
      marginBottom: 'var(--space-4)'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-heading-3)',
      color: 'var(--text-strong)',
      marginBottom: 'var(--space-3)'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-muted)',
      margin: 0
    }
  }, d))))), /*#__PURE__*/React.createElement(Section, {
    tone: "light"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-10)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Stakeholders",
    title: "Value, named per audience"
  }), /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 's',
      header: 'Stakeholder'
    }, {
      key: 'v',
      header: 'Value'
    }],
    rows: [{
      s: 'Investors',
      v: 'Attractive long-term returns'
    }, {
      s: 'Government',
      v: 'Economic diversification'
    }, {
      s: 'Businesses',
      v: 'Growth platforms'
    }, {
      s: 'Entrepreneurs',
      v: 'Market access'
    }, {
      s: 'Communities',
      v: 'Jobs & sustainable development'
    }]
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Revenue model",
    title: "Develop \xB7 Operate \xB7 Invest \xB7 Monetize"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, [['Develop', 'Business platforms · New ventures · Business models'], ['Operate', 'Platform management · Shared services · Performance optimization'], ['Invest', 'Equity investments · Joint ventures · Strategic acquisition'], ['Monetize', 'Investment returns · Management fees · Platform revenues · Advisory services']].map(([h, d]) => /*#__PURE__*/React.createElement("div", {
    key: h,
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      alignItems: 'baseline',
      borderTop: '1px solid var(--border-hairline)',
      paddingTop: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-heading-4)',
      color: 'var(--text-strong)',
      minWidth: 110
    }
  }, h), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-muted)'
    }
  }, d)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => setView('contact')
  }, "Request the framework"))))));
}
Object.assign(window, {
  ApproachScreen,
  STAGES,
  VALUES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/corporate_site/ApproachScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/corporate_site/ContactScreen.jsx
try { (() => {
const {
  Input,
  Select,
  Textarea,
  Checkbox,
  Button,
  Card,
  Eyebrow,
  Toast,
  Dialog,
  Wordmark,
  Tooltip
} = window.SEEMPRIMEDesignSystem_99f8b0;
function ContactScreen() {
  const [sent, setSent] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [err, setErr] = React.useState('');
  const submit = e => {
    e.preventDefault();
    if (!email.includes('@')) {
      setErr('Enter a valid work email.');
      return;
    }
    setErr('');
    setConfirm(true);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, {
    tone: "light",
    pad: "var(--space-11)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-11)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Contact",
    title: "Talk to SEEM PRIME",
    lead: "Tell us which platform or sector you are interested in. Our team replies within two business days."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, [['Head office', 'Al Khalidiyah District, Jeddah, Saudi Arabia'], ['Email', 'info@seem.sa'], ['Telephone', '+966 53 680 0016']].map(([h, v]) => /*#__PURE__*/React.createElement("div", {
    key: h,
    style: {
      borderTop: '1px solid var(--border-hairline)',
      paddingTop: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: 6
    }
  }, h), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-lg)',
      color: 'var(--text-strong)'
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-9)',
      position: 'relative',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      height: 200
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/contact-green-glass.png",
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--wash-protect-bottom)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 'var(--space-6)',
      bottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    tone: "onBrand",
    size: "md"
  })))), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-9)"
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      display: 'grid',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Full name",
    placeholder: "Name"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Organisation",
    placeholder: "Company"
  })), /*#__PURE__*/React.createElement(Input, {
    label: "Work email",
    placeholder: "name@company.com",
    value: email,
    error: err,
    onChange: e => setEmail(e.target.value),
    prefix: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "mail"
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "I am a",
    options: ['Investor', 'Operator / founder', 'Government entity', 'Partner']
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Focus sector",
    options: window.SECTORS
  })), /*#__PURE__*/React.createElement(Textarea, {
    label: "How can we help?",
    rows: 4,
    placeholder: "Tell us about the opportunity."
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Send me the investor briefing",
    description: "Quarterly, no marketing."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-up-right"
    })
  }, "Send request"), /*#__PURE__*/React.createElement(Tooltip, {
    label: "We never share your details"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      cursor: 'help'
    }
  }, "Privacy"))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: confirm,
    title: "Send this request to SEEM PRIME?",
    description: "We will reply from info@seem.sa within two business days.",
    onClose: () => setConfirm(false),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setConfirm(false)
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setConfirm(false);
        setSent(true);
      }
    }, "Confirm"))
  }), sent && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      right: 'var(--space-6)',
      bottom: 'var(--space-6)',
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "positive",
    title: "Request sent",
    message: "Our team replies within two business days.",
    onDismiss: () => setSent(false)
  })));
}
Object.assign(window, {
  ContactScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/corporate_site/ContactScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/corporate_site/HomeScreen.jsx
try { (() => {
const {
  Button,
  Card,
  Eyebrow,
  Tag,
  StatFigure,
  StepBadge,
  Wordmark,
  GlassPanel,
  AccentRule
} = window.SEEMPRIMEDesignSystem_99f8b0;
const MODEL = [{
  k: 'S',
  t: 'Strategy',
  q: 'Where are we going?',
  out: 'A clear strategic plan'
}, {
  k: 'E',
  t: 'Enablement',
  q: 'Are we ready to execute?',
  out: 'High readiness for execution'
}, {
  k: 'E',
  t: 'Execution',
  q: 'How do we turn plans into reality?',
  out: 'Disciplined execution with high quality'
}, {
  k: 'M',
  t: 'Measurement',
  q: 'Did we achieve the impact?',
  out: 'Sustainable impact and continuous growth'
}];
const PILLARS = ['Develop economic platforms', 'Invest in high-growth sectors', 'Build strategic partnerships', 'Deliver operational excellence', 'Drive digital transformation'];
const SECTORS = ['Industry', 'Technology', 'Food', 'Logistics', 'Tourism', 'Real Estate', 'Financial Services', 'Entertainment'];
const PLATFORMS = [{
  name: 'FUTURE VENTURES',
  desc: 'AI & emerging-technology investments',
  sector: 'Technology',
  img: 'white-green-planes'
}, {
  name: 'ZL.TOURS',
  desc: 'Digital tourism marketplace',
  sector: 'Tourism',
  img: 'zl-tours-z-sculpture'
}, {
  name: 'Property & Hospitality',
  desc: 'Operating platform',
  sector: 'Real Estate',
  img: 'architecture-green-fins'
}, {
  name: 'Bean-bar Chocolate',
  desc: 'Premium food platform',
  sector: 'Food',
  img: 'white-green-planes'
}, {
  name: 'Last-Mile OS',
  desc: 'Logistics operating system',
  sector: 'Logistics',
  img: 'diagonal-glass-planes'
}];
function Hero({
  setView
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: 620,
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/glass-capsule-green.png",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--wash-protect-left)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '0 var(--space-8) var(--space-12)',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onBrand"
  }, "Economic ecosystem builder"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-display-1)',
      fontSize: 'clamp(40px,5.4vw,var(--fs-display-1))',
      letterSpacing: 'var(--tracking-display)',
      color: '#fff',
      margin: 'var(--space-5) 0 var(--space-6)',
      maxWidth: '18ch'
    }
  }, "Building and operating integrated economic ecosystems"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-lg)',
      color: 'var(--text-on-brand-muted)',
      maxWidth: '54ch',
      margin: '0 0 var(--space-8)'
    }
  }, "We build and operate scalable economic platforms that connect opportunities, resources, and markets to create sustainable value for all stakeholders."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "onBrand",
    onClick: () => setView('portfolio')
  }, "Our portfolio"), /*#__PURE__*/React.createElement(Button, {
    variant: "onBrandGhost",
    onClick: () => setView('approach')
  }, "The SEEM model"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: 3,
      background: 'var(--rule-accent)'
    }
  }));
}
function HomeScreen({
  setView
}) {
  const [sector, setSector] = React.useState('All');
  const platforms = sector === 'All' ? PLATFORMS : PLATFORMS.filter(p => p.sector === sector);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    setView: setView
  }), /*#__PURE__*/React.createElement(Section, {
    tone: "light"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Who we are",
    title: "Strategy, enablement, execution, measurement",
    lead: "SEEM PRIME is a strategic investment and operating company specializing in developing, operating, and investing in scalable business platforms. SEEM = Sustainable Strategic Impact."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
      gap: 'var(--space-6)'
    }
  }, MODEL.map((m, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    padding: "var(--space-7)"
  }, /*#__PURE__*/React.createElement(StepBadge, {
    state: i === 0 ? 'active' : 'default'
  }, m.k), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-heading-3)',
      color: 'var(--text-strong)',
      margin: 'var(--space-5) 0 var(--space-3)'
    }
  }, m.t), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-muted)',
      margin: '0 0 var(--space-5)'
    }
  }, m.q), /*#__PURE__*/React.createElement(AccentRule, {
    length: 28,
    tone: "green"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-accent)',
      marginTop: 'var(--space-3)'
    }
  }, "Output"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-body)'
    }
  }, m.out))))), /*#__PURE__*/React.createElement(Section, {
    tone: "sunken"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '0.9fr 1.1fr',
      gap: 'var(--space-11)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Strategic pillars",
    title: "Five pillars, one operating discipline"
  }), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0
    }
  }, PILLARS.map((p, i) => /*#__PURE__*/React.createElement("li", {
    key: p,
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      alignItems: 'baseline',
      padding: 'var(--space-4) 0',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-data)',
      color: 'var(--text-muted)'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-heading-4)',
      color: 'var(--text-strong)'
    }
  }, p))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      aspectRatio: '4 / 3'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/white-green-planes.png",
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement(GlassPanel, {
    tone: "dark",
    radius: "lg",
    padding: "var(--space-5)",
    style: {
      position: 'absolute',
      left: 'var(--space-6)',
      bottom: 'var(--space-6)',
      maxWidth: 300
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-sm)',
      color: '#fff'
    }
  }, "Global & local strategic partnerships, next-gen technology solutions, AI-powered at the core."))))), /*#__PURE__*/React.createElement(Section, {
    tone: "light"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Strategic focus sectors",
    title: "Eight sectors under one platform discipline"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-3)'
    }
  }, ['All'].concat(SECTORS).map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    onClick: () => setSector(s),
    style: {
      all: 'unset',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    selected: sector === s
  }, s)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
      gap: 'var(--space-6)',
      marginTop: 'var(--space-8)'
    }
  }, platforms.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.name,
    interactive: true,
    padding: "var(--space-0)",
    radius: "lg",
    style: {
      overflow: 'hidden'
    },
    onClick: () => setView('portfolio')
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 168,
      background: 'var(--silver-100)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: '../../assets/imagery/' + p.img + '.png',
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    rule: false,
    tone: "muted"
  }, p.sector), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-heading-3)',
      color: 'var(--text-strong)',
      margin: 'var(--space-3) 0 var(--space-2)'
    }
  }, p.name), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-muted)',
      margin: 0
    }
  }, p.desc)))))), /*#__PURE__*/React.createElement(Section, {
    tone: "brand"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    tone: "brand",
    eyebrow: "Strategic targets by 2030",
    title: "Measured impact, not ambition"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5,minmax(0,1fr))',
      gap: 'var(--space-7)'
    }
  }, [{
    i: '01',
    v: '40',
    l: 'Business platforms'
  }, {
    i: '02',
    v: 'SR 1B',
    l: 'Investment portfolio'
  }, {
    i: '03',
    v: '200',
    l: 'Jobs created'
  }, {
    i: '04',
    v: '50',
    l: 'Strategic partnerships'
  }, {
    i: '05',
    v: '10%',
    l: 'Annual growth'
  }].map(s => /*#__PURE__*/React.createElement(StatFigure, {
    key: s.i,
    index: s.i,
    value: s.v,
    label: s.l,
    size: "md",
    tone: "onBrand"
  })))));
}
Object.assign(window, {
  HomeScreen,
  MODEL,
  PILLARS,
  SECTORS,
  PLATFORMS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/corporate_site/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/corporate_site/PortfolioScreen.jsx
try { (() => {
const {
  Card,
  Eyebrow,
  Tag,
  Badge,
  Button,
  StatFigure,
  DataTable,
  GlassPanel,
  Divider
} = window.SEEMPRIMEDesignSystem_99f8b0;
const ROADMAP = [['2025', 'Foundation', 'Platform build-out and first operating companies.'], ['2026–2028', 'Saudi Expansion', 'Scale across the eight focus sectors in-Kingdom.'], ['2029', 'Regional Expansion', 'Extend platforms into the wider region.'], ['2030', 'Leading Economic Ecosystem Platform', 'Integrated ecosystem at scale.']];
function PortfolioScreen({
  setView
}) {
  const [active, setActive] = React.useState(window.PLATFORMS[1]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, {
    tone: "light",
    pad: "var(--space-11)"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Our portfolio platforms",
    title: "Five operating platforms, one ecosystem",
    lead: "Creating sustainable value \xB7 Measuring impact \xB7 Enabling growth \xB7 Building platforms."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.15fr',
      gap: 'var(--space-9)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, window.PLATFORMS.map(p => {
    const on = p.name === active.name;
    return /*#__PURE__*/React.createElement("button", {
      key: p.name,
      onClick: () => setActive(p),
      style: {
        all: 'unset',
        cursor: 'pointer',
        display: 'flex',
        gap: 'var(--space-5)',
        alignItems: 'center',
        padding: 'var(--space-5) var(--space-5) var(--space-5) var(--space-4)',
        borderTop: '1px solid var(--border-hairline)',
        background: on ? 'var(--surface-tint)' : 'transparent',
        borderLeft: on ? 'var(--rule-accent-w) solid var(--rule-accent)' : 'var(--rule-accent-w) solid transparent',
        transition: 'var(--transition-control)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        font: 'var(--type-heading-4)',
        color: 'var(--text-strong)'
      }
    }, p.name), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        font: 'var(--type-body-sm)',
        color: 'var(--text-muted)'
      }
    }, p.desc)), /*#__PURE__*/React.createElement(Badge, {
      tone: on ? 'positive' : 'neutral'
    }, p.sector));
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      aspectRatio: '16 / 10',
      background: 'var(--silver-100)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: '../../assets/imagery/' + active.img + '.png',
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement(GlassPanel, {
    tone: "dark",
    radius: "lg",
    padding: "var(--space-5)",
    style: {
      position: 'absolute',
      left: 'var(--space-5)',
      bottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onBrand",
    rule: false
  }, active.sector), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-heading-3)',
      color: '#fff',
      marginTop: 'var(--space-2)'
    }
  }, active.name))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
      gap: 'var(--space-6)',
      marginTop: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement(StatFigure, {
    value: "4",
    label: "Operating years",
    size: "md",
    rule: false
  }), /*#__PURE__*/React.createElement(StatFigure, {
    value: "SR 1B",
    label: "Portfolio target",
    size: "md",
    rule: false
  }), /*#__PURE__*/React.createElement(StatFigure, {
    value: "8",
    label: "Focus sectors",
    size: "md",
    rule: false
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-7)',
      display: 'flex',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => setView('contact')
  }, "Invest with us"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Platform brief"))))), /*#__PURE__*/React.createElement(Section, {
    tone: "brand"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    tone: "brand",
    eyebrow: "Strategic roadmap",
    title: "2025 to 2030"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
      gap: 'var(--space-7)'
    }
  }, ROADMAP.map(([y, t, d], i) => /*#__PURE__*/React.createElement("div", {
    key: y,
    style: {
      borderTop: '1px solid var(--border-on-brand-strong)',
      paddingTop: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-data)',
      color: 'var(--green-300)',
      marginBottom: 'var(--space-3)'
    }
  }, y), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-heading-3)',
      color: '#fff',
      marginBottom: 'var(--space-3)'
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-on-brand-muted)'
    }
  }, d))))), /*#__PURE__*/React.createElement(Section, {
    tone: "light"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Value proposition",
    title: "What we bring to a platform"
  }), /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 'n',
      header: '#',
      mono: true
    }, {
      key: 'h',
      header: 'Capability'
    }, {
      key: 'd',
      header: 'What it means'
    }],
    rows: [{
      n: '01',
      h: 'Investment expertise',
      d: 'Identifying, developing, and investing in high-potential opportunities.'
    }, {
      n: '02',
      h: 'Operational excellence',
      d: 'Transforming strategic vision into high-performing, scalable businesses.'
    }, {
      n: '03',
      h: 'Strategic partnerships',
      d: 'Building long-term partnerships that foster growth, innovation, and market access.'
    }, {
      n: '04',
      h: 'Scalable business platforms',
      d: 'Developing integrated platforms designed for sustainable growth and long-term scalability.'
    }, {
      n: '05',
      h: 'Sustainable economic value',
      d: 'Creating lasting value for all stakeholders through long-term economic impact.'
    }]
  })));
}
Object.assign(window, {
  PortfolioScreen,
  ROADMAP
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/corporate_site/PortfolioScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/corporate_site/SiteChrome.jsx
try { (() => {
const {
  Wordmark,
  Logo,
  Button,
  IconButton,
  Eyebrow,
  Divider
} = window.SEEMPRIMEDesignSystem_99f8b0;
const NAV = [{
  id: 'home',
  label: 'Home'
}, {
  id: 'approach',
  label: 'Approach'
}, {
  id: 'portfolio',
  label: 'Portfolio'
}, {
  id: 'contact',
  label: 'Contact'
}];
function SiteHeader({
  view,
  setView,
  scrolled,
  overlay = false
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: overlay ? 'fixed' : 'sticky',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 30,
      background: scrolled ? 'rgba(255,255,255,.92)' : 'var(--surface-glass-dark)',
      WebkitBackdropFilter: 'var(--blur-glass)',
      backdropFilter: 'var(--blur-glass)',
      borderBottom: '1px solid ' + (scrolled ? 'var(--border-hairline)' : 'var(--border-on-brand)'),
      transition: 'background-color var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-wide)',
      margin: '0 auto',
      padding: '0 var(--space-8)',
      height: 76,
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setView('home'),
    style: {
      all: 'unset',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    assetBase: "../..",
    tone: scrolled ? 'ink' : 'white',
    size: 40
  }), /*#__PURE__*/React.createElement(Wordmark, {
    size: "sm",
    tone: scrolled ? 'ink' : 'onBrand'
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 'var(--space-7)',
      marginInlineStart: 'auto'
    }
  }, NAV.map(n => {
    const on = n.id === view;
    return /*#__PURE__*/React.createElement("button", {
      key: n.id,
      onClick: () => setView(n.id),
      style: {
        all: 'unset',
        cursor: 'pointer',
        position: 'relative',
        padding: '6px 0',
        font: 'var(--type-label)',
        letterSpacing: 'var(--tracking-label)',
        textTransform: 'uppercase',
        color: scrolled ? on ? 'var(--text-strong)' : 'var(--text-muted)' : on ? '#fff' : 'var(--text-on-brand-muted)'
      }
    }, n.label, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        insetInline: 0,
        bottom: -2,
        height: 'var(--rule-accent-w)',
        background: on ? 'var(--rule-accent)' : 'transparent'
      }
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Search",
    variant: scrolled ? 'ghost' : 'onBrand',
    size: "sm"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "search"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: scrolled ? 'primary' : 'onBrand',
    size: "sm",
    onClick: () => setView('contact')
  }, "Talk to us"))));
}
function SiteFooter({
  setView
}) {
  return /*#__PURE__*/React.createElement("footer", {
    "data-theme": "brand",
    style: {
      background: 'var(--surface-brand-deep)',
      color: 'var(--text-on-brand)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-wide)',
      margin: '0 auto',
      padding: 'var(--space-11) var(--space-8) var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 'var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      marginBottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    assetBase: "../..",
    tone: "white",
    size: 44
  }), /*#__PURE__*/React.createElement(Wordmark, {
    size: "sm",
    tone: "onBrand"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-on-brand-muted)',
      maxWidth: '34ch'
    }
  }, "Empowering Businesses | Accelerating Growth | Building Economic Ecosystems")), [{
    h: 'Company',
    items: ['Who we are', 'Strategic positioning', 'Corporate values', 'Governance']
  }, {
    h: 'Platforms',
    items: ['FUTURE VENTURES', 'ZL.TOURS', 'Property & hospitality', 'Last-mile OS']
  }, {
    h: 'Head office',
    items: ['Al Khalidiyah District', 'Jeddah, Saudi Arabia', 'info@seem.sa', '+966 53 680 0016']
  }].map(col => /*#__PURE__*/React.createElement("div", {
    key: col.h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-on-brand-muted)',
      marginBottom: 'var(--space-5)'
    }
  }, col.h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, col.items.map(i => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-on-brand-muted)'
    }
  }, i)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--border-on-brand)',
      margin: 'var(--space-9) 0 var(--space-6)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      font: 'var(--type-caption)',
      color: 'var(--text-on-brand-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 SEEM PRIME. All rights reserved."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, "SEEM = Sustainable Strategic Impact"))));
}
function SectionHead({
  eyebrow,
  title,
  lead,
  align = 'start',
  tone = 'light'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align === 'center' ? 'center' : 'start',
      marginBottom: 'var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: tone === 'brand' ? 'onBrand' : 'accent'
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-display-3)',
      letterSpacing: 'var(--tracking-display)',
      color: tone === 'brand' ? '#fff' : 'var(--text-strong)',
      maxWidth: '22ch'
    }
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-lg)',
      color: tone === 'brand' ? 'var(--text-on-brand-muted)' : 'var(--text-muted)',
      maxWidth: '62ch',
      margin: 0
    }
  }, lead));
}
function Section({
  children,
  tone = 'light',
  pad = 'var(--section-y)',
  style
}) {
  const brand = tone === 'brand';
  return /*#__PURE__*/React.createElement("section", {
    "data-theme": brand ? 'brand' : undefined,
    style: {
      background: brand ? 'var(--surface-brand)' : tone === 'sunken' ? 'var(--surface-sunken)' : 'var(--surface-page)',
      padding: pad + ' 0',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '0 var(--space-8)'
    }
  }, children));
}
Object.assign(window, {
  SiteHeader,
  SiteFooter,
  SectionHead,
  Section,
  NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/corporate_site/SiteChrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/investor_portal/DashboardScreen.jsx
try { (() => {
const {
  Card,
  StatFigure,
  DataTable,
  Badge,
  Button,
  IconButton,
  Tabs,
  Eyebrow,
  AccentRule,
  Tag,
  Tooltip,
  Divider
} = window.SEEMPRIMEDesignSystem_99f8b0;
const HOLDINGS = [{
  p: 'FUTURE VENTURES',
  s: 'Technology',
  c: 'SR 240M',
  i: '18.4%',
  st: 'On track'
}, {
  p: 'ZL.TOURS',
  s: 'Tourism',
  c: 'SR 180M',
  i: '14.1%',
  st: 'On track'
}, {
  p: 'Property & Hospitality',
  s: 'Real Estate',
  c: 'SR 310M',
  i: '11.6%',
  st: 'On track'
}, {
  p: 'Bean-bar Chocolate',
  s: 'Food',
  c: 'SR 42M',
  i: '8.2%',
  st: 'Due 2028'
}, {
  p: 'Last-Mile OS',
  s: 'Logistics',
  c: 'SR 96M',
  i: '9.7%',
  st: 'At risk'
}];
function DashboardScreen({
  setView,
  notify
}) {
  const [range, setRange] = React.useState('Q3 2026');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(window.PortalTopBar, {
    title: "Portfolio overview",
    crumbs: [{
      label: 'Investor portal',
      href: '#'
    }, {
      label: 'Dashboard'
    }],
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Tooltip, {
      label: "Export the quarterly pack"
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "Download pack",
      onClick: () => notify('Quarterly pack downloading')
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "download"
    }))), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      onClick: () => setView('reports')
    }, "Open reports"))
  }), /*#__PURE__*/React.createElement(window.PortalBody, null, /*#__PURE__*/React.createElement(Tabs, {
    items: ['Q3 2026', 'Q2 2026', 'Q1 2026', 'FY 2025'],
    value: range,
    onChange: setRange
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
      gap: 'var(--space-6)'
    }
  }, [{
    v: 'SR 868M',
    l: 'Committed capital',
    c: range
  }, {
    v: '12.8%',
    l: 'Blended IRR',
    c: 'Net of fees'
  }, {
    v: '5',
    l: 'Operating platforms',
    c: 'Of 40 by 2030'
  }, {
    v: '200',
    l: 'Jobs created',
    c: 'Cumulative'
  }].map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.l,
    padding: "var(--space-6)"
  }, /*#__PURE__*/React.createElement(StatFigure, {
    value: s.v,
    label: s.l,
    caption: s.c,
    size: "md"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr',
      gap: 'var(--space-6)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-7)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Holdings"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-heading-3)',
      color: 'var(--text-strong)',
      marginTop: 'var(--space-3)'
    }
  }, "Platform performance")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => setView('platforms')
  }, "All platforms")), /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 'p',
      header: 'Platform'
    }, {
      key: 's',
      header: 'Sector'
    }, {
      key: 'c',
      header: 'Capital',
      mono: true,
      align: 'end'
    }, {
      key: 'i',
      header: 'IRR',
      mono: true,
      align: 'end'
    }, {
      key: 'st',
      header: 'Status'
    }],
    rows: HOLDINGS.map(h => ({
      ...h,
      st: /*#__PURE__*/React.createElement(Badge, {
        tone: h.st === 'On track' ? 'positive' : h.st === 'At risk' ? 'critical' : 'caution',
        dot: h.st === 'On track'
      }, h.st)
    }))
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-7)"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Capital call"), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-heading-3)',
      color: 'var(--text-strong)',
      margin: 'var(--space-3) 0 var(--space-4)'
    }
  }, "SR 24M due 30 Sep"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-muted)'
    }
  }, "Tranche 3 \u2014 Last-Mile OS expansion into Riyadh and Dammam."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      marginTop: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => notify('Capital call acknowledged')
  }, "Acknowledge"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary"
  }, "View notice"))), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-7)"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Sector exposure"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-5)'
    }
  }, [['Real Estate', 36], ['Technology', 28], ['Tourism', 21], ['Logistics', 11], ['Food', 4]].map(([s, pct]) => /*#__PURE__*/React.createElement("div", {
    key: s
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      font: 'var(--type-body-sm)',
      color: 'var(--text-body)',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, s), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      color: 'var(--text-muted)'
    }
  }, pct, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-capsule)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + '%',
      height: '100%',
      background: 'var(--green-700)',
      borderRadius: 'var(--radius-capsule)'
    }
  }))))))))));
}
Object.assign(window, {
  DashboardScreen,
  HOLDINGS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/investor_portal/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/investor_portal/LoginScreen.jsx
try { (() => {
const {
  Input,
  Button,
  Checkbox,
  Logo,
  Wordmark,
  Eyebrow,
  GlassPanel,
  Card,
  Tooltip
} = window.SEEMPRIMEDesignSystem_99f8b0;
function LoginScreen({
  onSignIn
}) {
  const [email, setEmail] = React.useState('investor@fund.sa');
  const [pw, setPw] = React.useState('••••••••••');
  const [err, setErr] = React.useState('');
  const go = e => {
    e.preventDefault();
    if (!email.includes('@')) {
      setErr('Use the email registered with SEEM PRIME.');
      return;
    }
    onSignIn();
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.15fr 1fr',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/diagonal-glass-planes.png",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--wash-protect-bottom)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      padding: 'var(--space-10)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    assetBase: "../..",
    tone: "white",
    size: 44
  }), /*#__PURE__*/React.createElement(Wordmark, {
    size: "sm",
    tone: "onBrand"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onBrand"
  }, "Investor portal"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-display-2)',
      letterSpacing: 'var(--tracking-display)',
      color: '#fff',
      margin: 'var(--space-4) 0 0',
      maxWidth: '20ch'
    }
  }, "Measured impact, reported quarterly"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-lg)',
      color: 'var(--text-on-brand-muted)',
      maxWidth: '46ch',
      marginTop: 'var(--space-5)'
    }
  }, "Portfolio performance, platform reporting, and capital calls for SEEM PRIME investors.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-10)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: go,
    style: {
      width: '100%',
      maxWidth: 400,
      display: 'grid',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Secure sign in"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-heading-1)',
      color: 'var(--text-strong)',
      marginTop: 'var(--space-4)'
    }
  }, "Sign in")), /*#__PURE__*/React.createElement(Input, {
    label: "Registered email",
    value: email,
    error: err,
    onChange: e => setEmail(e.target.value),
    prefix: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "mail"
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Password",
    type: "password",
    value: pw,
    onChange: e => setPw(e.target.value),
    prefix: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "lock"
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Keep me signed in"
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      font: 'var(--type-caption)'
    }
  }, "Forgot password")), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    fullWidth: true,
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-right"
    })
  }, "Sign in"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      margin: 0
    }
  }, "Access is granted to registered investors only. Contact info@seem.sa for credentials."))));
}
Object.assign(window, {
  LoginScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/investor_portal/LoginScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/investor_portal/PlatformsScreen.jsx
try { (() => {
const {
  Card,
  Badge,
  Tag,
  Button,
  IconButton,
  StatFigure,
  Eyebrow,
  GlassPanel,
  DataTable,
  Divider
} = window.SEEMPRIMEDesignSystem_99f8b0;
const PLATFORM_IMGS = ['white-green-planes', 'zl-tours-z-sculpture', 'architecture-green-fins', 'blade-split-green-white', 'diagonal-glass-planes'];
function PlatformsScreen({
  notify
}) {
  const [sel, setSel] = React.useState(0);
  const holding = window.HOLDINGS[sel];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(window.PortalTopBar, {
    title: "Platforms",
    crumbs: [{
      label: 'Investor portal',
      href: '#'
    }, {
      label: 'Platforms'
    }],
    actions: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      onClick: () => notify('Platform brief requested')
    }, "Request brief")
  }), /*#__PURE__*/React.createElement(window.PortalBody, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '340px 1fr',
      gap: 'var(--space-7)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-0)",
    style: {
      overflow: 'hidden'
    }
  }, window.HOLDINGS.map((h, i) => /*#__PURE__*/React.createElement("button", {
    key: h.p,
    onClick: () => setSel(i),
    style: {
      all: 'unset',
      cursor: 'pointer',
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      padding: 'var(--space-5) var(--space-5) var(--space-5) var(--space-4)',
      borderBottom: '1px solid var(--border-hairline)',
      borderLeft: 'var(--rule-accent-w) solid ' + (i === sel ? 'var(--rule-accent)' : 'transparent'),
      background: i === sel ? 'var(--surface-tint)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-heading-4)',
      color: 'var(--text-strong)'
    }
  }, h.p), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)'
    }
  }, h.c, " \xB7 IRR ", h.i)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 260,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: '../../assets/imagery/' + PLATFORM_IMGS[sel] + '.png',
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement(GlassPanel, {
    tone: "dark",
    radius: "lg",
    padding: "var(--space-5)",
    style: {
      position: 'absolute',
      left: 'var(--space-5)',
      bottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onBrand",
    rule: false
  }, holding.s), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-heading-2)',
      color: '#fff',
      marginTop: 'var(--space-2)'
    }
  }, holding.p)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 'var(--space-5)',
      right: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: holding.st === 'On track' ? 'positive' : holding.st === 'At risk' ? 'critical' : 'caution'
  }, holding.st))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-6)"
  }, /*#__PURE__*/React.createElement(StatFigure, {
    value: holding.c,
    label: "Capital",
    size: "md",
    rule: false
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-6)"
  }, /*#__PURE__*/React.createElement(StatFigure, {
    value: holding.i,
    label: "IRR",
    size: "md",
    rule: false
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-6)"
  }, /*#__PURE__*/React.createElement(StatFigure, {
    value: "2025",
    label: "Vintage",
    size: "md",
    rule: false
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-6)"
  }, /*#__PURE__*/React.createElement(StatFigure, {
    value: "4",
    label: "Operating KPIs",
    size: "md",
    rule: false
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-7)"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Performance KPIs"), /*#__PURE__*/React.createElement(DataTable, {
    dense: true,
    style: {
      marginTop: 'var(--space-5)'
    },
    columns: [{
      key: 'k',
      header: 'KPI'
    }, {
      key: 't',
      header: 'Target',
      mono: true,
      align: 'end'
    }, {
      key: 'a',
      header: 'Actual',
      mono: true,
      align: 'end'
    }, {
      key: 'p',
      header: 'Period',
      mono: true,
      align: 'end'
    }],
    rows: [{
      k: 'Platform revenue',
      t: 'SR 62M',
      a: 'SR 58M',
      p: 'Q3 2026'
    }, {
      k: 'Gross margin',
      t: '41%',
      a: '43%',
      p: 'Q3 2026'
    }, {
      k: 'Active partners',
      t: '120',
      a: '134',
      p: 'Q3 2026'
    }, {
      k: 'Jobs created',
      t: '40',
      a: '37',
      p: 'FY 2026'
    }]
  }))))));
}
Object.assign(window, {
  PlatformsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/investor_portal/PlatformsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/investor_portal/PortalShell.jsx
try { (() => {
const {
  Logo,
  Wordmark,
  IconButton,
  Badge,
  Button,
  Breadcrumbs,
  Divider,
  Tooltip
} = window.SEEMPRIMEDesignSystem_99f8b0;
const PORTAL_NAV = [{
  id: 'dashboard',
  label: 'Dashboard',
  icon: 'layout-dashboard'
}, {
  id: 'platforms',
  label: 'Platforms',
  icon: 'layers'
}, {
  id: 'reports',
  label: 'Reports',
  icon: 'file-text'
}, {
  id: 'settings',
  label: 'Settings',
  icon: 'settings'
}];
function PortalSidebar({
  view,
  setView,
  onSignOut
}) {
  return /*#__PURE__*/React.createElement("aside", {
    "data-theme": "brand",
    style: {
      width: 260,
      flex: '0 0 260px',
      background: 'var(--surface-brand-deep)',
      color: 'var(--text-on-brand)',
      display: 'flex',
      flexDirection: 'column',
      padding: 'var(--space-7) var(--space-5)',
      gap: 'var(--space-8)',
      position: 'sticky',
      top: 0,
      height: '100vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      paddingInline: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    assetBase: "../..",
    tone: "white",
    size: 36
  }), /*#__PURE__*/React.createElement(Wordmark, {
    size: "sm",
    tone: "onBrand"
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-1)'
    }
  }, PORTAL_NAV.map(n => {
    const on = n.id === view;
    return /*#__PURE__*/React.createElement("button", {
      key: n.id,
      onClick: () => setView(n.id),
      style: {
        all: 'unset',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        padding: 'var(--space-3) var(--space-4)',
        borderRadius: 'var(--radius-md)',
        background: on ? 'rgba(255,255,255,.10)' : 'transparent',
        borderLeft: 'var(--rule-accent-w) solid ' + (on ? 'var(--rule-accent)' : 'transparent'),
        color: on ? '#fff' : 'var(--text-on-brand-muted)',
        font: 'var(--type-body-sm)',
        transition: 'var(--transition-control)'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": n.icon
    }), n.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5)',
      border: '1px solid var(--border-on-brand)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-on-brand-muted)',
      marginBottom: 'var(--space-3)'
    }
  }, "Reporting cycle"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-data)',
      color: '#fff'
    }
  }, "Q3 2026 \xB7 closes 14 Oct")), /*#__PURE__*/React.createElement("button", {
    onClick: onSignOut,
    style: {
      all: 'unset',
      cursor: 'pointer',
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-on-brand-muted)',
      padding: 'var(--space-3) var(--space-4)'
    }
  }, "Sign out")));
}
function PortalTopBar({
  title,
  crumbs,
  actions
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 'var(--space-6)',
      padding: 'var(--space-8) var(--space-9) var(--space-6)',
      borderBottom: '1px solid var(--border-hairline)',
      background: 'var(--surface-card)',
      position: 'sticky',
      top: 0,
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Breadcrumbs, {
    items: crumbs,
    style: {
      marginBottom: 'var(--space-3)'
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-heading-1)',
      color: 'var(--text-strong)'
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)'
    }
  }, actions));
}
function PortalBody({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-8) var(--space-9) var(--space-12)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-8)'
    }
  }, children);
}
Object.assign(window, {
  PortalSidebar,
  PortalTopBar,
  PortalBody,
  PORTAL_NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/investor_portal/PortalShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/investor_portal/ReportsScreen.jsx
try { (() => {
const {
  Card,
  Button,
  IconButton,
  Badge,
  Select,
  Input,
  DataTable,
  Eyebrow,
  Dialog,
  Tag
} = window.SEEMPRIMEDesignSystem_99f8b0;
const DOCS = [['Q3 2026 performance pack', 'Quarterly report', '14 Oct 2026', 'PDF · 4.2 MB'], ['Capital call notice — tranche 3', 'Notice', '30 Sep 2026', 'PDF · 240 KB'], ['ZL.TOURS platform brief', 'Platform brief', '12 Sep 2026', 'PDF · 1.8 MB'], ['Q2 2026 performance pack', 'Quarterly report', '15 Jul 2026', 'PDF · 4.0 MB'], ['Corporate identity & strategic framework', 'Corporate', '01 Jun 2026', 'PDF · 9.1 MB'], ['Audited financial statements FY 2025', 'Financial', '28 Mar 2026', 'PDF · 2.6 MB']];
function ReportsScreen({
  notify
}) {
  const [q, setQ] = React.useState('');
  const [kind, setKind] = React.useState('All types');
  const [preview, setPreview] = React.useState(null);
  const rows = DOCS.filter(d => (kind === 'All types' || d[1] === kind) && d[0].toLowerCase().includes(q.toLowerCase()));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(window.PortalTopBar, {
    title: "Reports & documents",
    crumbs: [{
      label: 'Investor portal',
      href: '#'
    }, {
      label: 'Reports'
    }],
    actions: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      onClick: () => notify('Archive export queued')
    }, "Export archive")
  }), /*#__PURE__*/React.createElement(window.PortalBody, null, /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-6)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 220px',
      gap: 'var(--space-5)',
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Search documents",
    placeholder: "Quarterly, notice, brief\u2026",
    value: q,
    onChange: e => setQ(e.target.value),
    prefix: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "search"
    })
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Type",
    value: kind,
    onChange: e => setKind(e.target.value),
    options: ['All types', 'Quarterly report', 'Notice', 'Platform brief', 'Financial', 'Corporate']
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-7)"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, rows.length, " documents"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-5)'
    }
  }, rows.map(d => /*#__PURE__*/React.createElement("div", {
    key: d[0],
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-5)',
      padding: 'var(--space-4) 0',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "file-text"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--type-heading-4)',
      color: 'var(--text-strong)'
    }
  }, d[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)'
    }
  }, d[2], " \xB7 ", d[3])), /*#__PURE__*/React.createElement(Badge, null, d[1]), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary",
    onClick: () => setPreview(d)
  }, "Open"), /*#__PURE__*/React.createElement(IconButton, {
    label: "Download",
    size: "sm",
    variant: "ghost",
    onClick: () => notify(d[0] + ' downloading')
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "download"
  })))), rows.length === 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-muted)',
      paddingTop: 'var(--space-5)'
    }
  }, "No documents match that search.")))), /*#__PURE__*/React.createElement(Dialog, {
    open: !!preview,
    title: preview ? preview[0] : '',
    description: preview ? preview[1] + ' · ' + preview[2] + ' · ' + preview[3] : '',
    onClose: () => setPreview(null),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setPreview(null)
    }, "Close"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        notify('Download started');
        setPreview(null);
      }
    }, "Download"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 160,
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/white-green-planes.png",
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }))));
}
Object.assign(window, {
  ReportsScreen,
  DOCS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/investor_portal/ReportsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/investor_portal/SettingsScreen.jsx
try { (() => {
const {
  Card,
  Input,
  Select,
  Switch,
  Checkbox,
  Radio,
  Button,
  Divider,
  Eyebrow,
  Badge,
  Textarea
} = window.SEEMPRIMEDesignSystem_99f8b0;
function SettingsScreen({
  notify
}) {
  const [channel, setChannel] = React.useState('email');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(window.PortalTopBar, {
    title: "Settings",
    crumbs: [{
      label: 'Investor portal',
      href: '#'
    }, {
      label: 'Settings'
    }],
    actions: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      onClick: () => notify('Preferences saved')
    }, "Save changes")
  }), /*#__PURE__*/React.createElement(window.PortalBody, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-6)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-7)"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Account"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-5)',
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Full name",
    defaultValue: "Faisal Al-Harbi"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Registered email",
    defaultValue: "investor@fund.sa",
    hint: "Changing this requires re-verification."
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Reporting language",
    options: ['English', 'العربية / Arabic']
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Currency",
    options: ['SR — Saudi riyal', 'USD — US dollar']
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-7)"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Notifications"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    label: "Quarterly reporting alerts",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Capital call notices",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Platform milestone updates"
  }), /*#__PURE__*/React.createElement(Divider, {
    spacing: "var(--space-4)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Preferred channel"), /*#__PURE__*/React.createElement(Radio, {
    name: "ch",
    label: "Email",
    checked: channel === 'email',
    onChange: () => setChannel('email')
  }), /*#__PURE__*/React.createElement(Radio, {
    name: "ch",
    label: "Portal only",
    checked: channel === 'portal',
    onChange: () => setChannel('portal')
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-7)"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Security"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-body)'
    }
  }, "Two-factor authentication"), /*#__PURE__*/React.createElement(Badge, {
    tone: "positive",
    dot: true
  }, "Enabled")), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Require re-authentication for downloads",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Textarea, {
    label: "Access note for our team",
    rows: 2,
    placeholder: "Optional"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: () => notify('Sessions revoked')
  }, "Sign out all devices")))))));
}
Object.assign(window, {
  SettingsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/investor_portal/SettingsScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AccentRule = __ds_scope.AccentRule;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.GlassPanel = __ds_scope.GlassPanel;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.StatFigure = __ds_scope.StatFigure;

__ds_ns.StepBadge = __ds_scope.StepBadge;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Breadcrumbs = __ds_scope.Breadcrumbs;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
