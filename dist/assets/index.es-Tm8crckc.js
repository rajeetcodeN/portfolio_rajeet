var pt=Object.defineProperty;var gt=(f,e,o)=>e in f?pt(f,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):f[e]=o;var i=(f,e,o)=>gt(f,typeof e!="symbol"?e+"":e,o);const vt=`void main() {
vUv = uv;
vPosition = position;
float waveOffset = -u_y_offset * u_y_offset_wave_multiplier;
float colorOffset = -u_y_offset * u_y_offset_color_multiplier;
float flowOffset = -u_y_offset * u_y_offset_flow_multiplier;
v_displacement_amount = cnoise( vec3(
u_wave_frequency_x * position.x + u_time,
u_wave_frequency_y * (position.y + waveOffset) + u_time,
u_time
));
vec2 baseUv = vUv;
baseUv.y += flowOffset / u_plane_height;
vec2 flowUv = baseUv;
if (u_flow_enabled > 0.5) {
if (u_flow_ease > 0.0 || u_flow_distortion_a > 0.0) {
vec2 ppp = -1.0 + 2.0 * baseUv;
ppp += 0.1 * cos((1.5 * u_flow_scale) * ppp.yx + 1.1 * u_time + vec2(0.1, 1.1));
ppp += 0.1 * cos((2.3 * u_flow_scale) * ppp.yx + 1.3 * u_time + vec2(3.2, 3.4));
ppp += 0.1 * cos((2.2 * u_flow_scale) * ppp.yx + 1.7 * u_time + vec2(1.8, 5.2));
ppp += u_flow_distortion_a * cos((u_flow_distortion_b * u_flow_scale) * ppp.yx + 1.4 * u_time + vec2(6.3, 3.9));
float r = length(ppp);
flowUv = mix(baseUv, vec2(baseUv.x * (1.0 - u_flow_ease) + r * u_flow_ease, baseUv.y), u_flow_ease);
}
}
vFlowUv = flowUv;
vec3 color = u_colors[0].color;
vec3 distortedPos = position;
if (u_flat_shading < 0.5) {
if (u_flow_enabled > 0.5) {
if (u_flow_ease > 0.0 || u_flow_distortion_a > 0.0) {
vec3 ppp = position / 25.0;
ppp.xyz += 0.1 * cos((1.5 * u_flow_scale) * ppp.yxz + 1.1 * u_time + vec3(0.1, 1.1, 2.1));
ppp.xyz += 0.1 * cos((2.3 * u_flow_scale) * ppp.zxy + 1.3 * u_time + vec3(3.2, 3.4, 1.2));
ppp.xyz += 0.1 * cos((2.2 * u_flow_scale) * ppp.yxz + 1.7 * u_time + vec3(1.8, 5.2, 3.1));
ppp.xyz += u_flow_distortion_a * cos((u_flow_distortion_b * u_flow_scale) * ppp.zxy + 1.4 * u_time + vec3(6.3, 3.9, 4.5));
float r = length(ppp);
distortedPos = mix(position, vec3(
position.x * (1.0 - u_flow_ease) + r * u_flow_ease * 25.0,
position.y,
position.z * (1.0 - u_flow_ease) + r * u_flow_ease * 25.0
), u_flow_ease);
}
}
}
vec3 noise_cord;
if (u_flat_shading < 0.5) {
noise_cord = vec3(distortedPos.x / 50.0, (distortedPos.y + colorOffset) / 50.0, distortedPos.z / 50.0);
} else {
vec2 adjustedUv = flowUv;
adjustedUv.y += colorOffset / u_plane_height;
noise_cord = vec3(adjustedUv, 0.0);
}
const float minNoise = .0;
const float maxNoise = .9;
for (int i = 1; i < 6; i++) {
if (i < u_colors_count) {
if (u_colors[i].is_active > 0.5) {
float noiseFlow = (1. + float(i)) / 30.;
float noiseSpeed = (1. + float(i)) * 0.11;
float noiseSeed = 13. + float(i) * 7.;
float noise_z = u_time * noiseSpeed;
if (u_flat_shading < 0.5) {
noise_z = noise_cord.z * u_color_pressure.x * u_color_pressure.x + u_time * noiseSpeed;
}
float noise = snoise(
vec3(
noise_cord.x * u_color_pressure.x * u_color_pressure.x + u_time * noiseFlow * 2.,
noise_cord.y * u_color_pressure.y * u_color_pressure.y,
noise_z
) + noiseSeed
) - (.1 * float(i)) + (.5 * u_color_blending);
noise = clamp(noise, minNoise, maxNoise + float(i) * 0.02);
color = mix(color, u_colors[i].color, smoothstep(0.0, u_color_blending, noise));
}
}
}
v_color = color;
vec3 newPosition = position + normal * v_displacement_amount * u_wave_amplitude;
vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
vViewPosition = mvPosition.xyz;
vNormal = normalize((modelViewMatrix * vec4(normal, 0.0)).xyz);
gl_Position = projectionMatrix * mvPosition;
v_new_position = gl_Position;
}`,yt=`float random(vec2 p) {
return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);
}
float fbm(vec3 x) {
float value = 0.0;
float amplitude = 0.5;
float frequency = 1.0;
for (int i = 0; i < 2; i++) {
value += amplitude * snoise(x * frequency);
frequency *= 2.0;
amplitude *= 0.5;
}
return value;
}
vec3 hsl2rgb(float h, float s, float l) {
vec3 rgb = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
return l + s * (rgb - 0.5) * (1.0 - abs(2.0 * l - 1.0));
}
void main() {
vec2 finalUv = vFlowUv;
vec3 baseColor;
float texAlpha = 1.0;
if (u_enable_procedural_texture > 0.5) {
if (u_flat_shading < 0.5) {
float parallaxFactor = 0.25;
float scrollOffset = (u_y_offset * u_y_offset_color_multiplier) * parallaxFactor;
vec3 scrolledPos = vPosition;
scrolledPos.y -= scrollOffset;
vec3 p = (scrolledPos * 1.5) / 50.0;
vec2 uvX = p.yz + vec2(0.5);
vec2 uvY = p.zx + vec2(0.5);
vec2 uvZ = p.xy + vec2(0.5);
vec4 colX = texture2D(u_procedural_texture, uvX);
vec4 colY = texture2D(u_procedural_texture, uvY);
vec4 colZ = texture2D(u_procedural_texture, uvZ);
vec3 n = normalize(vNormal);
vec3 blendWeights = abs(n);
blendWeights = blendWeights / (blendWeights.x + blendWeights.y + blendWeights.z + 0.0001);
vec4 texSample = colX * blendWeights.x + colY * blendWeights.y + colZ * blendWeights.z;
baseColor = texSample.rgb;
if (u_transparent_texture_void > 0.5) {
texAlpha = texSample.a;
}
} else {
vec2 ppp = -1.0 + 2.0 * finalUv;
ppp += 0.1 * cos((1.5 * u_flow_scale) * ppp.yx + 1.1 * u_time + vec2(0.1, 1.1));
ppp += 0.1 * cos((2.3 * u_flow_scale) * ppp.yx + 1.3 * u_time + vec2(3.2, 3.4));
ppp += 0.1 * cos((2.2 * u_flow_scale) * ppp.yx + 1.7 * u_time + vec2(1.8, 5.2));
ppp += u_flow_distortion_a * cos((u_flow_distortion_b * u_flow_scale) * ppp.yx + 1.4 * u_time + vec2(6.3, 3.9));
float r = length(ppp);
float vx = (finalUv.x * u_texture_ease) + (r * (1.0 - u_texture_ease));
float vy = (finalUv.y * u_texture_ease) + (0.0 * (1.0 - u_texture_ease));
vec2 texUv = vec2(vx, vy);
float parallaxFactor = 0.25;
texUv.y -= (u_y_offset * u_y_offset_color_multiplier / u_plane_height) * parallaxFactor;
texUv *= 1.5;
vec4 texSample = texture2D(u_procedural_texture, texUv);
baseColor = texSample.rgb;
if (u_transparent_texture_void > 0.5) {
texAlpha = texSample.a;
}
}
} else {
baseColor = v_color;
}
vec3 color = baseColor;
if (u_domain_warp_enabled > 0.5) {
vec3 p;
if (u_flat_shading < 0.5) {
p = vec3((vPosition / 50.0 + vec3(0.5)) * u_domain_warp_scale);
p.z += u_time * 0.15;
} else {
p = vec3(finalUv * u_domain_warp_scale, u_time * 0.15);
}
vec2 q = vec2(fbm(p), fbm(p + vec3(5.2, 1.3, 0.0)));
float f = fbm(p + vec3(4.0 * q, 0.0));
vec3 warpColor = color * (1.0 + f * 0.8 * u_domain_warp_intensity);
float pattern = clamp(f * f * f + 0.6 * f * f + 0.5 * f, 0.0, 1.0);
color = mix(color, warpColor * (0.6 + pattern * 0.8), u_domain_warp_intensity * 0.7);
}
vec3 normal = normalize(vNormal);
vec3 viewDir = vec3(0.0, 0.0, 1.0);
float ndotv = dot(normal, viewDir);
if (u_shape_type > 0.5 && u_shape_type < 3.5) {
if (ndotv < 0.0) {
discard;
}
} else {
if (ndotv < 0.0) {
normal = -normal;
ndotv = -ndotv;
}
}
vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
float diffuse = max(dot(normal, lightDir), 0.0);
vec3 halfDir = normalize(lightDir + viewDir);
float specular = pow(max(dot(normal, halfDir), 0.0), 32.0);
if (u_flat_shading > 0.5) {
color += v_displacement_amount * u_highlights;
float heightShadow = 1.0 - v_displacement_amount;
color -= heightShadow * heightShadow * u_shadows;
} else {
color += specular * u_highlights;
color += v_displacement_amount * u_highlights * 0.5;
float heightShadow = 1.0 - v_displacement_amount;
color -= heightShadow * heightShadow * u_shadows * 0.5;
color -= (1.0 - diffuse) * u_shadows * 0.5;
}
color = saturation(color, 1.0 + u_saturation);
color = color * u_brightness;
if (u_iridescence_enabled > 0.5) {
float hue = fract(v_displacement_amount * 0.5 + 0.5 + u_time * u_iridescence_speed * 0.05);
vec3 iriColor = hsl2rgb(hue, 0.8, 0.6);
color = mix(color, iriColor, u_iridescence_intensity * abs(v_displacement_amount) * 0.6);
}
if (u_fresnel_enabled > 0.5) {
float slope = 1.0 - abs(v_displacement_amount);
float fresnel = pow(max(slope, 0.0), u_fresnel_power);
color += u_fresnel_color * fresnel * u_fresnel_intensity;
}
if (u_vignette_intensity > 0.0) {
vec2 vigUv = vUv;
if (u_flat_shading < 0.5) {
vigUv = (v_new_position.xy / v_new_position.w) * 0.5 + vec2(0.5);
}
float dist = length(vigUv - vec2(0.5));
float vig = smoothstep(u_vignette_radius, u_vignette_radius * 0.3, dist);
color *= mix(1.0, vig, u_vignette_intensity);
}
if (u_bloom_intensity > 0.0) {
float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
float bloomMask = smoothstep(u_bloom_threshold, 1.0, luma);
color += color * bloomMask * u_bloom_intensity;
}
if (u_chromatic_aberration > 0.0) {
float caAmount = u_chromatic_aberration * 0.008;
vec2 caUv = vUv;
if (u_flat_shading < 0.5) {
caUv = (v_new_position.xy / v_new_position.w) * 0.5 + vec2(0.5);
}
float dist = length(caUv - vec2(0.5));
float rShift = v_displacement_amount + caAmount * dist;
float bShift = v_displacement_amount - caAmount * dist;
color.r *= 1.0 + rShift * caAmount * 10.0;
color.b *= 1.0 - bShift * caAmount * 10.0;
}
float grain = 0.0;
if (u_grain_intensity > 0.0) {
vec2 noiseCoords = gl_FragCoord.xy / u_grain_scale;
if (u_grain_speed != 0.0 || u_flat_shading > 0.5) {
grain = fbm(vec3(noiseCoords, u_time * u_grain_speed));
} else {
grain = random(noiseCoords) - 0.5;
}
grain = grain * 0.5 + 0.5;
grain -= 0.5;
grain = (grain > u_grain_sparsity) ? grain : 0.0;
grain *= u_grain_intensity;
}
color += vec3(grain);
float edgeAlpha = 1.0;
if (u_silhouette_fade > 0.0 && u_flat_shading < 0.5) {
edgeAlpha = smoothstep(0.0, u_silhouette_fade, ndotv);
}
if (u_shape_type == 3.0) {
float vFade = smoothstep(0.0, u_cylinder_fade, vUv.y) * smoothstep(1.0, 1.0 - u_cylinder_fade, vUv.y);
edgeAlpha *= vFade;
} else if (u_shape_type == 4.0) {
float uFade = smoothstep(0.0, u_ribbon_fade, vUv.x) * smoothstep(1.0, 1.0 - u_ribbon_fade, vUv.x);
float vFade = smoothstep(0.0, u_ribbon_fade, vUv.y) * smoothstep(1.0, 1.0 - u_ribbon_fade, vUv.y);
edgeAlpha *= uFade * vFade;
}
edgeAlpha *= texAlpha;
gl_FragColor = vec4(color, edgeAlpha);
}`;function xt(){return`precision highp float;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
varying vec2 vUv;
varying vec2 vFlowUv;
varying vec4 v_new_position;
varying vec3 v_color;
varying float v_displacement_amount;
varying vec3 vViewPosition;
varying vec3 vNormal;
varying vec3 vPosition;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_color_pressure;
uniform float u_wave_frequency_x;
uniform float u_wave_frequency_y;
uniform float u_wave_amplitude;
uniform float u_plane_width;
uniform float u_plane_height;
uniform float u_color_blending;
uniform int u_colors_count;
struct ColorStop {
float is_active;
vec3 color;
float influence;
};
uniform ColorStop u_colors[6];
uniform float u_y_offset;
uniform float u_y_offset_wave_multiplier;
uniform float u_y_offset_color_multiplier;
uniform float u_y_offset_flow_multiplier;
uniform float u_flow_distortion_a;
uniform float u_flow_distortion_b;
uniform float u_flow_scale;
uniform float u_flow_ease;
uniform float u_flow_enabled;
uniform float u_fresnel_enabled;
uniform float u_fresnel_power;
uniform float u_fresnel_intensity;
uniform vec3 u_fresnel_color;
uniform float u_shape_type;
uniform float u_flat_shading;`}function wt(){return`precision highp float;
varying vec2 vUv;
varying vec2 vFlowUv;
varying vec4 v_new_position;
varying vec3 v_color;
varying float v_displacement_amount;
varying vec3 vViewPosition;
varying vec3 vNormal;
varying vec3 vPosition;
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_plane_height;
uniform float u_shadows;
uniform float u_highlights;
uniform float u_saturation;
uniform float u_brightness;
uniform float u_grain_intensity;
uniform float u_grain_sparsity;
uniform float u_grain_scale;
uniform float u_grain_speed;
uniform float u_y_offset;
uniform float u_y_offset_color_multiplier;
uniform float u_flow_distortion_a;
uniform float u_flow_distortion_b;
uniform float u_flow_scale;
uniform sampler2D u_procedural_texture;
uniform float u_enable_procedural_texture;
uniform float u_texture_ease;
uniform float u_domain_warp_enabled;
uniform float u_domain_warp_intensity;
uniform float u_domain_warp_scale;
uniform float u_vignette_intensity;
uniform float u_vignette_radius;
uniform float u_fresnel_enabled;
uniform float u_fresnel_power;
uniform float u_fresnel_intensity;
uniform vec3 u_fresnel_color;
uniform float u_iridescence_enabled;
uniform float u_iridescence_intensity;
uniform float u_iridescence_speed;
uniform float u_bloom_intensity;
uniform float u_bloom_threshold;
uniform float u_chromatic_aberration;
uniform float u_shape_type;
uniform float u_transparent_texture_void;
uniform float u_silhouette_fade;
uniform float u_cylinder_fade;
uniform float u_ribbon_fade;
uniform float u_flat_shading;`}function se(){return`vec4 permute(vec4 x) {
return floor(fract(sin(x) * 43758.5453123) * 289.0);
}
vec4 taylorInvSqrt(vec4 r) {
return 1.79284291400159 - 0.85373472095314 * r;
}
vec3 fade(vec3 t) {
return t*t*t*(t*(t*6.0-15.0)+10.0);
}
float snoise(vec3 v) {
const vec2 C = vec2(1.0/6.0, 1.0/3.0) ;
const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
vec3 i = floor(v + dot(v, C.yyy) );
vec3 x0 = v - i + dot(i, C.xxx) ;
vec3 g = step(x0.yzx, x0.xyz);
vec3 l = 1.0 - g;
vec3 i1 = min( g.xyz, l.zxy );
vec3 i2 = max( g.xyz, l.zxy );
vec3 x1 = x0 - i1 + C.xxx;
vec3 x2 = x0 - i2 + C.yyy;
vec3 x3 = x0 - D.yyy;
vec4 p = permute( permute( permute(
i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
+ i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
+ i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
float n_ = 0.142857142857;
vec3 ns = n_ * D.wyz - D.xzx;
vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
vec4 x_ = floor(j * ns.z);
vec4 y_ = floor(j - 7.0 * x_ );
vec4 x = x_ *ns.x + ns.yyyy;
vec4 y = y_ *ns.x + ns.yyyy;
vec4 h = 1.0 - abs(x) - abs(y);
vec4 b0 = vec4( x.xy, y.xy );
vec4 b1 = vec4( x.zw, y.zw );
vec4 s0 = floor(b0)*2.0 + 1.0;
vec4 s1 = floor(b1)*2.0 + 1.0;
vec4 sh = -step(h, vec4(0.0));
vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
vec3 p0 = vec3(a0.xy,h.x);
vec3 p1 = vec3(a0.zw,h.y);
vec3 p2 = vec3(a1.xy,h.z);
vec3 p3 = vec3(a1.zw,h.w);
vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
p0 *= norm.x;
p1 *= norm.y;
p2 *= norm.z;
p3 *= norm.w;
vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
m = m * m;
return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
dot(p2,x2), dot(p3,x3) ) );
}
float cnoise(vec3 P)
{
vec3 Pi0 = floor(P);
vec3 Pi1 = Pi0 + vec3(1.0);
vec3 Pf0 = fract(P);
vec3 Pf1 = Pf0 - vec3(1.0);
vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
vec4 iy = vec4(Pi0.yy, Pi1.yy);
vec4 iz0 = Pi0.zzzz;
vec4 iz1 = Pi1.zzzz;
vec4 ixy = permute(permute(ix) + iy);
vec4 ixy0 = permute(ixy + iz0);
vec4 ixy1 = permute(ixy + iz1);
vec4 gx0 = ixy0 * (1.0 / 7.0);
vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
gx0 = fract(gx0);
vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
vec4 sz0 = step(gz0, vec4(0.0));
gx0 -= sz0 * (step(0.0, gx0) - 0.5);
gy0 -= sz0 * (step(0.0, gy0) - 0.5);
vec4 gx1 = ixy1 * (1.0 / 7.0);
vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
gx1 = fract(gx1);
vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
vec4 sz1 = step(gz1, vec4(0.0));
gx1 -= sz1 * (step(0.0, gx1) - 0.5);
gy1 -= sz1 * (step(0.0, gy1) - 0.5);
vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
g000 *= norm0.x;
g010 *= norm0.y;
g100 *= norm0.z;
g110 *= norm0.w;
vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
g001 *= norm1.x;
g011 *= norm1.y;
g101 *= norm1.z;
g111 *= norm1.w;
float n000 = dot(g000, Pf0);
float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
float n111 = dot(g111, Pf1);
vec3 fade_xyz = fade(Pf0);
vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
return 2.2 * n_xyz;
}`}function ae(){return`vec3 saturation(vec3 rgb, float adjustment) {
const vec3 W = vec3(0.2125, 0.7154, 0.0721);
vec3 intensity = vec3(dot(rgb, W));
return mix(intensity, rgb, adjustment);
}`}class de{constructor(){i(this,"elements");this.elements=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}identity(){const e=this.elements;return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}translate(e,o,r){return this.elements[12]+=this.elements[0]*e+this.elements[4]*o+this.elements[8]*r,this.elements[13]+=this.elements[1]*e+this.elements[5]*o+this.elements[9]*r,this.elements[14]+=this.elements[2]*e+this.elements[6]*o+this.elements[10]*r,this.elements[15]+=this.elements[3]*e+this.elements[7]*o+this.elements[11]*r,this}rotateX(e){const o=Math.cos(e),r=Math.sin(e),_=this.elements[4],t=this.elements[5],s=this.elements[6],u=this.elements[7],n=this.elements[8],g=this.elements[9],x=this.elements[10],m=this.elements[11];return this.elements[4]=o*_+r*n,this.elements[5]=o*t+r*g,this.elements[6]=o*s+r*x,this.elements[7]=o*u+r*m,this.elements[8]=o*n-r*_,this.elements[9]=o*g-r*t,this.elements[10]=o*x-r*s,this.elements[11]=o*m-r*u,this}rotateY(e){const o=Math.cos(e),r=Math.sin(e),_=this.elements[0],t=this.elements[1],s=this.elements[2],u=this.elements[3],n=this.elements[8],g=this.elements[9],x=this.elements[10],m=this.elements[11];return this.elements[0]=o*_-r*n,this.elements[1]=o*t-r*g,this.elements[2]=o*s-r*x,this.elements[3]=o*u-r*m,this.elements[8]=r*_+o*n,this.elements[9]=r*t+o*g,this.elements[10]=r*s+o*x,this.elements[11]=r*u+o*m,this}rotateZ(e){const o=Math.cos(e),r=Math.sin(e),_=this.elements[0],t=this.elements[1],s=this.elements[2],u=this.elements[3],n=this.elements[4],g=this.elements[5],x=this.elements[6],m=this.elements[7];return this.elements[0]=o*_+r*n,this.elements[1]=o*t+r*g,this.elements[2]=o*s+r*x,this.elements[3]=o*u+r*m,this.elements[4]=-r*_+o*n,this.elements[5]=-r*t+o*g,this.elements[6]=-r*s+o*x,this.elements[7]=-r*u+o*m,this}}class bt{constructor(e,o,r,_,t,s){i(this,"left");i(this,"right");i(this,"top");i(this,"bottom");i(this,"near");i(this,"far");i(this,"position");i(this,"projectionMatrix");i(this,"zoom");this.left=e,this.right=o,this.top=r,this.bottom=_,this.near=t,this.far=s,this.position=[0,0,0],this.zoom=1,this.projectionMatrix=new de,this.updateProjectionMatrix()}updateProjectionMatrix(){const e=1/(this.right-this.left),o=1/(this.top-this.bottom),r=1/(this.far-this.near),_=(this.right+this.left)*e,t=(this.top+this.bottom)*o,s=(this.far+this.near)*r;this.projectionMatrix.elements=new Float32Array([2*e,0,0,0,0,2*o,0,0,0,0,-2*r,0,-_,-t,-s,1])}}function j(f,e,o,r=50,_=50,t="plane",s=1){f.zoom=s;const u=e/o;if(t==="plane"){const n=e*o/1e6*r*_/1.5,g=Math.sqrt(n*u),x=n/g;let m=-r/2,h=Math.min((m+g)/1.5,r/2),R=_/4,l=Math.max((R-x)/2,-_/4);if(u<1){const v=u;m=m*v,h=h*v;const A=1.05;m=m*A,h=h*A,R=R*A,l=l*A}f.left=m,f.right=h,f.top=R,f.bottom=l}else{let n=25;if(t==="sphere"?n=30:t==="torus"?n=35:t==="cylinder"&&(n=30),u>=1)f.left=-n*u,f.right=n*u,f.top=n,f.bottom=-n;else{f.left=-n,f.right=n,f.top=n/u,f.bottom=-n/u;const g=1.05;f.left*=g,f.right*=g,f.top*=g,f.bottom*=g}}f.left/=s,f.right/=s,f.top/=s,f.bottom/=s,f.near=-100,f.far=1e3,f.updateProjectionMatrix()}function ne(f,e,o,r){const _=f/2,t=e/2,s=Math.floor(o),u=Math.floor(r),n=s+1,g=u+1,x=f/s,m=e/u,h=[],R=[],l=[],v=[];for(let b=0;b<g;b++){const T=b*m-t;for(let w=0;w<n;w++){const d=w*x-_;R.push(d,-T,0),l.push(0,0,1),v.push(w/s),v.push(1-b/u)}}for(let b=0;b<u;b++)for(let T=0;T<s;T++){const w=T+n*b,d=T+n*(b+1),F=T+1+n*(b+1),c=T+1+n*b;h.push(w,d,c),h.push(d,F,c)}const A=R.length/3>65535,y=[];for(let b=0;b<h.length;b+=3){const T=h[b],w=h[b+1],d=h[b+2];y.push(T,w,w,d,d,T)}return{position:new Float32Array(R),normal:new Float32Array(l),uv:new Float32Array(v),index:A?new Uint32Array(h):new Uint16Array(h),wireframeIndex:A?new Uint32Array(y):new Uint16Array(y)}}function le(f,e,o){const r=[],_=[],t=[],s=[],u=Math.floor(e),n=Math.floor(o);for(let m=0;m<=n;m++){const h=m/n,R=h*Math.PI;for(let l=0;l<=u;l++){const v=l/u,A=v*Math.PI*2,y=-f*Math.sin(R)*Math.cos(A),b=f*Math.cos(R),T=f*Math.sin(R)*Math.sin(A);r.push(y,b,T);const w=Math.sqrt(y*y+b*b+T*T);_.push(y/w,b/w,T/w),t.push(v,1-h)}}for(let m=0;m<n;m++)for(let h=0;h<u;h++){const R=h+(u+1)*m,l=h+(u+1)*(m+1),v=h+1+(u+1)*(m+1),A=h+1+(u+1)*m;s.push(R,l,A),s.push(l,v,A)}const g=r.length/3>65535,x=[];for(let m=0;m<s.length;m+=3){const h=s[m],R=s[m+1],l=s[m+2];x.push(h,R,R,l,l,h)}return{position:new Float32Array(r),normal:new Float32Array(_),uv:new Float32Array(t),index:g?new Uint32Array(s):new Uint16Array(s),wireframeIndex:g?new Uint32Array(x):new Uint16Array(x)}}function _e(f,e,o,r){const _=[],t=[],s=[],u=[],n=Math.floor(o),g=Math.floor(r);for(let h=0;h<=n;h++){const R=h/n*Math.PI*2;for(let l=0;l<=g;l++){const v=l/g*Math.PI*2,A=(f+e*Math.cos(R))*Math.cos(v),y=(f+e*Math.cos(R))*Math.sin(v),b=e*Math.sin(R);_.push(A,y,b);const T=f*Math.cos(v),w=f*Math.sin(v),d=A-T,F=y-w,c=b,E=Math.sqrt(d*d+F*F+c*c);t.push(d/E,F/E,c/E),s.push(l/g,h/n)}}for(let h=1;h<=n;h++)for(let R=1;R<=g;R++){const l=(g+1)*h+R-1,v=(g+1)*(h-1)+R-1,A=(g+1)*(h-1)+R,y=(g+1)*h+R;u.push(l,v,y),u.push(v,A,y)}const x=_.length/3>65535,m=[];for(let h=0;h<u.length;h+=3){const R=u[h],l=u[h+1],v=u[h+2];m.push(R,l,l,v,v,R)}return{position:new Float32Array(_),normal:new Float32Array(t),uv:new Float32Array(s),index:x?new Uint32Array(u):new Uint16Array(u),wireframeIndex:x?new Uint32Array(m):new Uint16Array(m)}}function ue(f,e,o,r,_){const t=[],s=[],u=[],n=[],g=Math.floor(r),x=Math.floor(_),m=o/2;for(let l=0;l<=x;l++){const v=l/x,A=v*o-m,y=v*(e-f)+f;for(let b=0;b<=g;b++){const T=b/g,w=T*Math.PI*2,d=Math.sin(w),F=Math.cos(w);t.push(y*d,-A,y*F),s.push(d,0,F),u.push(T,1-v)}}for(let l=0;l<x;l++)for(let v=0;v<g;v++){const A=v+(g+1)*l,y=v+(g+1)*(l+1),b=v+1+(g+1)*(l+1),T=v+1+(g+1)*l;n.push(A,y,T),n.push(y,b,T)}const h=t.length/3>65535,R=[];for(let l=0;l<n.length;l+=3){const v=n[l],A=n[l+1],y=n[l+2];R.push(v,A,A,y,y,v)}return{position:new Float32Array(t),normal:new Float32Array(s),uv:new Float32Array(u),index:h?new Uint32Array(n):new Uint16Array(n),wireframeIndex:h?new Uint32Array(R):new Uint16Array(R)}}function fe(f,e,o,r,_,t){const s=f/2,u=e/2,n=Math.floor(o),g=Math.floor(r),x=n+1,m=g+1,h=f/n,R=e/g,l=[],v=[],A=[],y=[];for(let w=0;w<m;w++){const d=w*R-u;for(let F=0;F<x;F++){const c=F*h-s;let E=c,C=d,M=0,P=0,B=0,U=1;if(Math.abs(_)>.001){const D=f/_,z=c/D;E=D*Math.sin(z),M=D*(1-Math.cos(z)),P=Math.sin(z),U=Math.cos(z)}if(Math.abs(t)>.001){const D=d/e*t,z=Math.cos(D),S=Math.sin(D),I=E*z-M*S,k=E*S+M*z;E=I,M=k;const W=P*z-U*S,K=P*S+U*z;P=W,U=K}l.push(E,-C,M),v.push(P,B,U),A.push(F/n),A.push(1-w/g)}}for(let w=0;w<g;w++)for(let d=0;d<n;d++){const F=d+x*w,c=d+x*(w+1),E=d+1+x*(w+1),C=d+1+x*w;y.push(F,c,C),y.push(c,E,C)}const b=l.length/3>65535,T=[];for(let w=0;w<y.length;w+=3){const d=y[w],F=y[w+1],c=y[w+2];T.push(d,F,F,c,c,d)}return{position:new Float32Array(l),normal:new Float32Array(v),uv:new Float32Array(A),index:b?new Uint32Array(y):new Uint16Array(y),wireframeIndex:b?new Uint32Array(T):new Uint16Array(T)}}const Rt={kty:"EC",crv:"P-256",x:"n9A9jNvLNR6QJaPP4ZdpbXtPFz3ASUfeeQm11Jd53Rg",y:"EoG5ezJ3hr4c62JjpsyabotdFeU-A1LyH-qHyabnKc0",key_ops:["verify"],ext:!0};function ce(f){let e=f.replace(/-/g,"+").replace(/_/g,"/");for(;e.length%4!==0;)e+="=";const o=atob(e),r=new Uint8Array(o.length);for(let _=0;_<o.length;_++)r[_]=o.charCodeAt(_);return r}function At(f){if(typeof window>"u"||!window.location)return!0;const e=window.location.hostname.toLowerCase(),o=f.toLowerCase();return!!(e==="localhost"||e==="127.0.0.1"||e==="0.0.0.0"||e==="[::1]"||e.endsWith(".localhost")||e===o||e.endsWith("."+o))}async function Tt(f){try{if(typeof crypto>"u"||!crypto.subtle||typeof crypto.subtle.verify!="function")return{valid:!1,reason:"Web Crypto API not available (page must be served over HTTPS)"};const e=f.trim();if(!e.startsWith("NEAT-"))return{valid:!1,reason:'Key must start with "NEAT-" prefix'};const o=e.slice(5),r=o.indexOf(".");if(r===-1)return{valid:!1,reason:"Invalid key format: missing separator"};const _=o.slice(0,r),t=o.slice(r+1);if(!_||!t)return{valid:!1,reason:"Invalid key format: empty payload or signature"};const s=ce(_).buffer.slice(0),u=new TextDecoder().decode(s),n=JSON.parse(u);if(!n.domain||typeof n.domain!="string")return{valid:!1,reason:"Invalid payload: missing domain"};if(!At(n.domain)){const m=typeof window<"u"&&window.location?window.location.hostname:"unknown";return{valid:!1,reason:`Domain mismatch: key is for "${n.domain}" but current hostname is "${m}"`}}const g=ce(t).buffer.slice(0),x=await crypto.subtle.importKey("jwk",Rt,{name:"ECDSA",namedCurve:"P-256"},!1,["verify"]);return await crypto.subtle.verify({name:"ECDSA",hash:"SHA-256"},x,g,s)?{valid:!0,payload:n}:{valid:!1,reason:"Signature verification failed"}}catch(e){return{valid:!1,reason:`Unexpected error: ${e instanceof Error?e.message:String(e)}`}}}const Et="1.0.2";function he(){console.info(`%c🌈 Neat Gradients v${Et}%c

Licensed under MIT + The Commons Clause.
Free for personal and commercial use.
Selling this software or its derivatives is strictly prohibited.
Get a license key to remove the watermark and this message: https://neat.firecms.co`,"font-weight: bold; font-size: 14px; color: #FF5772;","color: inherit;")}const V=50,N=80,$=6,St=[["speed","_speed",20,1/20,"u"],["horizontalPressure","_horizontalPressure",4,1/4,"u"],["verticalPressure","_verticalPressure",4,1/4,"u"],["waveFrequencyX","_waveFrequencyX",1/.04,.04,"u"],["waveFrequencyY","_waveFrequencyY",1/.04,.04,"u"],["waveAmplitude","_waveAmplitude",1/.75,.75,"u"],["highlights","_highlights",100,1/100,"u"],["shadows","_shadows",100,1/100,"u"],["colorSaturation","_saturation",10,1/10,"u"],["colorBlending","_colorBlending",10,1/10,"u"],["yOffsetWaveMultiplier","_yOffsetWaveMultiplier",1e3,1/1e3,"u"],["yOffsetColorMultiplier","_yOffsetColorMultiplier",1e3,1/1e3,"u"],["yOffsetFlowMultiplier","_yOffsetFlowMultiplier",1e3,1/1e3,"u"],["colorBrightness","_brightness",1,1,"u"],["grainIntensity","_grainIntensity",1,1,"u"],["grainSparsity","_grainSparsity",1,1,"u"],["grainSpeed","_grainSpeed",1,1,"u"],["wireframe","_wireframe",1,1,"u"],["backgroundAlpha","_backgroundAlpha",1,1,"u"],["flowDistortionA","_flowDistortionA",1,1,"u"],["flowDistortionB","_flowDistortionB",1,1,"u"],["flowScale","_flowScale",1,1,"u"],["flowEase","_flowEase",1,1,"u"],["flowEnabled","_flowEnabled",1,1,"u"],["textureEase","_textureEase",1,1,"u"],["silhouetteFade","_silhouetteFade",1,1,"u"],["cylinderFade","_cylinderFade",1,1,"u"],["ribbonFade","_ribbonFade",1,1,"u"],["flatShading","_flatShading",1,1,"u"],["domainWarpEnabled","_domainWarpEnabled",1,1,"u"],["domainWarpIntensity","_domainWarpIntensity",1,1,"u"],["domainWarpScale","_domainWarpScale",1,1,"u"],["vignetteIntensity","_vignetteIntensity",1,1,"u"],["vignetteRadius","_vignetteRadius",1,1,"u"],["fresnelEnabled","_fresnelEnabled",1,1,"u"],["fresnelPower","_fresnelPower",1,1,"u"],["fresnelIntensity","_fresnelIntensity",1,1,"u"],["iridescenceEnabled","_iridescenceEnabled",1,1,"u"],["iridescenceIntensity","_iridescenceIntensity",1,1,"u"],["iridescenceSpeed","_iridescenceSpeed",1,1,"u"],["bloomIntensity","_bloomIntensity",1,1,"u"],["bloomThreshold","_bloomThreshold",1,1,"u"],["chromaticAberration","_chromaticAberration",1,1,"u"],["shapeRotationX","_shapeRotationX",1,1,"u"],["shapeRotationY","_shapeRotationY",1,1,"u"],["shapeRotationZ","_shapeRotationZ",1,1,"u"],["shapeAutoRotateSpeedX","_shapeAutoRotateSpeedX",1,1,"u"],["shapeAutoRotateSpeedY","_shapeAutoRotateSpeedY",1,1,"u"],["cameraX","_cameraX",1,1,"u"],["cameraY","_cameraY",1,1,"u"],["cameraZ","_cameraZ",1,1,"u"],["cameraRotationX","_cameraRotationX",1,1,"u"],["cameraRotationY","_cameraRotationY",1,1,"u"],["cameraRotationZ","_cameraRotationZ",1,1,"u"],["textureVoidLikelihood","_textureVoidLikelihood",1,1,"t"],["textureVoidWidthMin","_textureVoidWidthMin",1,1,"t"],["textureVoidWidthMax","_textureVoidWidthMax",1,1,"t"],["textureBandDensity","_textureBandDensity",1,1,"t"],["textureColorBlending","_textureColorBlending",1,1,"t"],["textureSeed","_textureSeed",1,1,"t"],["transparentTextureVoid","_transparentTextureVoid",1,1,"t"],["proceduralBackgroundColor","_proceduralBackgroundColor",1,1,"t"],["textureShapeTriangles","_textureShapeTriangles",1,1,"t"],["textureShapeCircles","_textureShapeCircles",1,1,"t"],["textureShapeBars","_textureShapeBars",1,1,"t"],["textureShapeSquiggles","_textureShapeSquiggles",1,1,"t"],["sphereRadius","_sphereRadius",1,1,"g"],["torusRadius","_torusRadius",1,1,"g"],["torusTube","_torusTube",1,1,"g"],["cylinderRadius","_cylinderRadius",1,1,"g"],["cylinderHeight","_cylinderHeight",1,1,"g"],["planeBend","_planeBend",1,1,"g"],["planeTwist","_planeTwist",1,1,"g"]];class Ft{constructor(e){i(this,"_ref");i(this,"_licensed",!1);i(this,"_antialias",!1);i(this,"_speed",-1);i(this,"_horizontalPressure",-1);i(this,"_verticalPressure",-1);i(this,"_waveFrequencyX",-1);i(this,"_waveFrequencyY",-1);i(this,"_waveAmplitude",-1);i(this,"_shadows",-1);i(this,"_highlights",-1);i(this,"_saturation",-1);i(this,"_brightness",-1);i(this,"_grainScale",-1);i(this,"_grainIntensity",-1);i(this,"_grainSparsity",-1);i(this,"_grainSpeed",-1);i(this,"_colorBlending",-1);i(this,"_resolution",1);i(this,"_colors",[]);i(this,"_wireframe",!1);i(this,"_backgroundColor","#FFFFFF");i(this,"_backgroundColorRgb",[1,1,1]);i(this,"_backgroundAlpha",1);i(this,"_flowDistortionA",0);i(this,"_flowDistortionB",0);i(this,"_flowScale",1);i(this,"_flowEase",0);i(this,"_flowEnabled",!0);i(this,"glState");i(this,"_enableProceduralTexture",!1);i(this,"_textureVoidLikelihood",.45);i(this,"_textureVoidWidthMin",200);i(this,"_textureVoidWidthMax",486);i(this,"_textureBandDensity",2.15);i(this,"_textureColorBlending",.01);i(this,"_textureSeed",333);i(this,"_textureEase",.5);i(this,"_transparentTextureVoid",!1);i(this,"_domainWarpEnabled",!1);i(this,"_domainWarpIntensity",.5);i(this,"_domainWarpScale",1);i(this,"_vignetteIntensity",.5);i(this,"_vignetteRadius",.8);i(this,"_fresnelEnabled",!1);i(this,"_fresnelPower",2);i(this,"_fresnelIntensity",.5);i(this,"_fresnelColor","#FFFFFF");i(this,"_fresnelColorRgb",[1,1,1]);i(this,"_iridescenceEnabled",!1);i(this,"_iridescenceIntensity",.5);i(this,"_iridescenceSpeed",1);i(this,"_bloomIntensity",0);i(this,"_bloomThreshold",.7);i(this,"_chromaticAberration",0);i(this,"_silhouetteFade",.25);i(this,"_cylinderFade",.08);i(this,"_ribbonFade",.05);i(this,"_flatShading",!0);i(this,"_shapeType","plane");i(this,"_shapeRotationX",0);i(this,"_shapeRotationY",0);i(this,"_shapeRotationZ",0);i(this,"_shapeAutoRotateSpeedX",0);i(this,"_shapeAutoRotateSpeedY",0);i(this,"_sphereRadius",15);i(this,"_torusRadius",15);i(this,"_torusTube",5);i(this,"_cylinderRadius",10);i(this,"_cylinderHeight",40);i(this,"_planeBend",0);i(this,"_planeTwist",0);i(this,"_cameraLock",!1);i(this,"_cameraX",0);i(this,"_cameraY",0);i(this,"_cameraZ",0);i(this,"_cameraRotationX",0);i(this,"_cameraRotationY",0);i(this,"_cameraRotationZ",0);i(this,"_cameraZoom",1);i(this,"_proceduralTexture",null);i(this,"_proceduralBackgroundColor","#000000");i(this,"_textureShapeTriangles",20);i(this,"_textureShapeCircles",15);i(this,"_textureShapeBars",15);i(this,"_textureShapeSquiggles",10);i(this,"requestRef",-1);i(this,"sizeObserver");i(this,"_currentCursor","");i(this,"_initialized",!1);i(this,"_cachedColorRgb",[]);i(this,"_yOffset",0);i(this,"_yOffsetWaveMultiplier",.004);i(this,"_yOffsetColorMultiplier",.004);i(this,"_yOffsetFlowMultiplier",.004);i(this,"_sourceCanvas",null);i(this,"_sourceCtx",null);i(this,"_maskedCanvas",null);i(this,"_maskedCtx",null);i(this,"_resizeTimeoutId",null);i(this,"_textureNeedsUpdate",!1);i(this,"_colorsChanged",!0);i(this,"_uniformsDirty",!0);i(this,"_textureDirty",!0);i(this,"_yOffsetDirty",!1);i(this,"_modelViewMatrix",new de);i(this,"_isVisible",!0);i(this,"_visibilityObserver",null);i(this,"_visibilityHandler",null);i(this,"_watermarkProgram",null);i(this,"_watermarkTexture",null);i(this,"_watermarkBuffer",null);i(this,"_watermarkTexCoordBuffer",null);i(this,"_watermarkWidth",0);i(this,"_watermarkHeight",0);i(this,"_watermarkMargin",4);i(this,"_wmLocPos",-1);i(this,"_wmLocTc",-1);i(this,"_wmLocTex",null);i(this,"_wmPosData",new Float32Array(8));i(this,"_wmClickHandler",null);i(this,"_wmMoveHandler",null);i(this,"_wmMoveRafPending",!1);i(this,"_wmCachedRect",null);i(this,"_wmRectCacheTime",0);i(this,"_gradientVAO",null);i(this,"_watermarkVAO",null);const{ref:o,speed:r=4,horizontalPressure:_=3,verticalPressure:t=3,waveFrequencyX:s=5,waveFrequencyY:u=5,waveAmplitude:n=3,colors:g,highlights:x=4,shadows:m=4,colorSaturation:h=0,colorBrightness:R=1,colorBlending:l=5,grainScale:v=2,grainIntensity:A=.55,grainSparsity:y=0,grainSpeed:b=.1,wireframe:T=!1,backgroundColor:w="#FFFFFF",backgroundAlpha:d=1,resolution:F=1,seed:c,yOffset:E=0,yOffsetWaveMultiplier:C=4,yOffsetColorMultiplier:M=4,yOffsetFlowMultiplier:P=4,flowDistortionA:B=0,flowDistortionB:U=0,flowScale:D=1,flowEase:z=0,flowEnabled:S=!0,enableProceduralTexture:I=!1,textureVoidLikelihood:k=.45,textureVoidWidthMin:W=200,textureVoidWidthMax:K=486,textureBandDensity:me=2.15,textureColorBlending:pe=.01,textureSeed:ge=333,textureEase:ve=.5,proceduralBackgroundColor:ye="#000000",transparentTextureVoid:xe=!1,textureShapeTriangles:we=20,textureShapeCircles:be=15,textureShapeBars:Re=15,textureShapeSquiggles:Ae=10,domainWarpEnabled:Te=!1,domainWarpIntensity:Ee=.5,domainWarpScale:Se=1,vignetteIntensity:Fe=0,vignetteRadius:Pe=.8,fresnelEnabled:Me=!1,fresnelPower:Ce=2,fresnelIntensity:Ue=.5,fresnelColor:Be="#FFFFFF",iridescenceEnabled:ze=!1,iridescenceIntensity:De=.5,iridescenceSpeed:Ie=1,bloomIntensity:Le=0,bloomThreshold:ke=.7,chromaticAberration:Oe=0,silhouetteFade:Ye=.25,cylinderFade:Ve=.08,ribbonFade:Ne=.05,flatShading:We=!0,cameraLock:Xe=!1,cameraX:He=0,cameraY:qe=0,cameraZ:Ge=0,cameraRotationX:Ze=0,cameraRotationY:je=0,cameraRotationZ:$e=0,cameraZoom:Ke=1,shapeType:Je="plane",shapeRotationX:Qe=0,shapeRotationY:et=0,shapeRotationZ:tt=0,shapeAutoRotateSpeedX:it=0,shapeAutoRotateSpeedY:rt=0,sphereRadius:ot=15,torusRadius:st=15,torusTube:at=5,cylinderRadius:nt=10,cylinderHeight:lt=40,planeBend:_t=0,planeTwist:ut=0,licenseKey:ee,preserveDrawingBuffer:ft=!1,antialias:ct=!1}=e;this._ref=o,this._antialias=ct,this.destroy=this.destroy.bind(this),this._initScene=this._initScene.bind(this),this.speed=r,this.horizontalPressure=_,this.verticalPressure=t,this.waveFrequencyX=s,this.waveFrequencyY=u,this.waveAmplitude=n,this.colorBlending=l,this._resolution=F,this.grainScale=v,this.grainIntensity=A,this.grainSparsity=y,this.grainSpeed=b,this.colors=g,this.shadows=m,this.highlights=x,this.colorSaturation=h,this.colorBrightness=R,this.wireframe=T,this.backgroundColor=w,this.backgroundAlpha=d,this.yOffset=E,this.yOffsetWaveMultiplier=C,this.yOffsetColorMultiplier=M,this.yOffsetFlowMultiplier=P,this.flowDistortionA=B,this.flowDistortionB=U,this.flowScale=D,this.flowEase=z,this.flowEnabled=S,this.enableProceduralTexture=I,this.textureVoidLikelihood=k,this.textureVoidWidthMin=W,this.textureVoidWidthMax=K,this.textureBandDensity=me,this.textureColorBlending=pe,this.textureSeed=ge,this.textureEase=ve,this._proceduralBackgroundColor=ye,this.transparentTextureVoid=xe,this._textureShapeTriangles=we,this._textureShapeCircles=be,this._textureShapeBars=Re,this._textureShapeSquiggles=Ae,this.domainWarpEnabled=Te,this.domainWarpIntensity=Ee,this.domainWarpScale=Se,this.vignetteIntensity=Fe,this.vignetteRadius=Pe,this.fresnelEnabled=Me,this.fresnelPower=Ce,this.fresnelIntensity=Ue,this.fresnelColor=Be,this.iridescenceEnabled=ze,this.iridescenceIntensity=De,this.iridescenceSpeed=Ie,this.bloomIntensity=Le,this.bloomThreshold=ke,this.chromaticAberration=Oe,this.silhouetteFade=Ye,this.cylinderFade=Ve,this.ribbonFade=Ne,this._flatShading=We,this._cameraLock=Xe,this._cameraX=He,this._cameraY=qe,this._cameraZ=Ge,this._cameraRotationX=Ze,this._cameraRotationY=je,this._cameraRotationZ=$e,this._cameraZoom=Ke,this._shapeType=Je,this._shapeRotationX=Qe,this._shapeRotationY=et,this._shapeRotationZ=tt,this._shapeAutoRotateSpeedX=it,this._shapeAutoRotateSpeedY=rt,this._sphereRadius=ot,this._torusRadius=st,this._torusTube=at,this._cylinderRadius=nt,this._cylinderHeight=lt,this._planeBend=_t,this._planeTwist=ut,this.glState=this._initScene(F,ft),this._initWatermark(),Mt(),ee?Tt(ee).then(a=>{this._licensed=a.valid,a.valid||(console.warn(`NEAT license key error: ${a.reason}`),he())}):he();let G=c!==void 0?c:Pt(),Z=performance.now();const H=()=>{const{gl:a,program:O,locations:p,indexCount:X,indexType:q}=this.glState;if(this._initialized){const te=performance.now();G+=(te-Z)/1e3*this._speed,Z=te,a.useProgram(O),a.uniform1f(p.uniforms.u_time,G);const J=this.glState.camera,Y=this._modelViewMatrix;Y.identity(),Y.translate(-J.position[0]-this._cameraX,-J.position[1]-this._cameraY,-J.position[2]-this._cameraZ),Y.translate(0,0,-1),Y.rotateX(-this._cameraRotationX),Y.rotateY(-this._cameraRotationY),Y.rotateZ(-this._cameraRotationZ);let Q=this._shapeRotationX,ie=this._shapeRotationY,dt=this._shapeRotationZ;this._shapeAutoRotateSpeedX!==0&&(Q+=G*this._shapeAutoRotateSpeedX*.1),this._shapeAutoRotateSpeedY!==0&&(ie+=G*this._shapeAutoRotateSpeedY*.1),this._shapeType==="plane"||this._shapeType==="ribbon"?Y.rotateX(Q-Math.PI/3.5):Y.rotateX(Q),Y.rotateY(ie),Y.rotateZ(dt);const re=p.uniforms.modelViewMatrix;if(re&&a.uniformMatrix4fv(re,!1,Y.elements),this._yOffsetDirty&&!this._uniformsDirty&&(a.uniform1f(p.uniforms.u_y_offset,this._yOffset),this._yOffsetDirty=!1),this._uniformsDirty){a.uniform2f(p.uniforms.u_resolution,this._ref.width,this._ref.height),a.uniform2f(p.uniforms.u_color_pressure,this._horizontalPressure,this._verticalPressure),a.uniform1f(p.uniforms.u_wave_frequency_x,this._waveFrequencyX),a.uniform1f(p.uniforms.u_wave_frequency_y,this._waveFrequencyY),a.uniform1f(p.uniforms.u_wave_amplitude,this._waveAmplitude),a.uniform1f(p.uniforms.u_color_blending,this._colorBlending),a.uniform1f(p.uniforms.u_shadows,this._shadows),a.uniform1f(p.uniforms.u_highlights,this._highlights),a.uniform1f(p.uniforms.u_saturation,this._saturation),a.uniform1f(p.uniforms.u_brightness,this._brightness),a.uniform1f(p.uniforms.u_grain_intensity,this._grainIntensity),a.uniform1f(p.uniforms.u_grain_sparsity,this._grainSparsity),a.uniform1f(p.uniforms.u_grain_speed,this._grainSpeed),a.uniform1f(p.uniforms.u_grain_scale,this._grainScale),a.uniform1f(p.uniforms.u_y_offset,this._yOffset),a.uniform1f(p.uniforms.u_y_offset_wave_multiplier,this._yOffsetWaveMultiplier),a.uniform1f(p.uniforms.u_y_offset_color_multiplier,this._yOffsetColorMultiplier),a.uniform1f(p.uniforms.u_y_offset_flow_multiplier,this._yOffsetFlowMultiplier),a.uniform1f(p.uniforms.u_flow_distortion_a,this._flowDistortionA),a.uniform1f(p.uniforms.u_flow_distortion_b,this._flowDistortionB),a.uniform1f(p.uniforms.u_flow_scale,this._flowScale),a.uniform1f(p.uniforms.u_flow_ease,this._flowEase),a.uniform1f(p.uniforms.u_flow_enabled,this._flowEnabled?1:0);let L=0;this._shapeType==="sphere"?L=1:this._shapeType==="torus"?L=2:this._shapeType==="cylinder"?L=3:this._shapeType==="ribbon"&&(L=4),a.uniform1f(p.uniforms.u_shape_type,L),a.uniform1f(p.uniforms.u_enable_procedural_texture,this._enableProceduralTexture?1:0),a.uniform1f(p.uniforms.u_texture_ease,this._textureEase),a.uniform1f(p.uniforms.u_transparent_texture_void,this._transparentTextureVoid?1:0),a.uniform1f(p.uniforms.u_domain_warp_enabled,this._domainWarpEnabled?1:0),a.uniform1f(p.uniforms.u_domain_warp_intensity,this._domainWarpIntensity),a.uniform1f(p.uniforms.u_domain_warp_scale,this._domainWarpScale),a.uniform1f(p.uniforms.u_vignette_intensity,this._vignetteIntensity),a.uniform1f(p.uniforms.u_vignette_radius,this._vignetteRadius),a.uniform1f(p.uniforms.u_fresnel_enabled,this._fresnelEnabled?1:0),a.uniform1f(p.uniforms.u_fresnel_power,this._fresnelPower),a.uniform1f(p.uniforms.u_fresnel_intensity,this._fresnelIntensity),a.uniform3fv(p.uniforms.u_fresnel_color,this._fresnelColorRgb),a.uniform1f(p.uniforms.u_iridescence_enabled,this._iridescenceEnabled?1:0),a.uniform1f(p.uniforms.u_iridescence_intensity,this._iridescenceIntensity),a.uniform1f(p.uniforms.u_iridescence_speed,this._iridescenceSpeed),a.uniform1f(p.uniforms.u_bloom_intensity,this._bloomIntensity),a.uniform1f(p.uniforms.u_bloom_threshold,this._bloomThreshold),a.uniform1f(p.uniforms.u_chromatic_aberration,this._chromaticAberration),a.uniform1f(p.uniforms.u_silhouette_fade,this._silhouetteFade),a.uniform1f(p.uniforms.u_cylinder_fade,this._cylinderFade),a.uniform1f(p.uniforms.u_ribbon_fade,this._ribbonFade),a.uniform1f(p.uniforms.u_flat_shading,this._flatShading?1:0),this._uniformsDirty=!1,this._yOffsetDirty=!1}if(this._textureNeedsUpdate&&this._enableProceduralTexture&&(this._proceduralTexture&&a.deleteTexture(this._proceduralTexture),this._proceduralTexture=this._createProceduralTexture(a),this._textureNeedsUpdate=!1,this._textureDirty=!0),this._textureDirty&&this._proceduralTexture&&(a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,this._proceduralTexture),a.uniform1i(p.uniforms.u_procedural_texture,1),this._textureDirty=!1),this._colorsChanged){this._colorsChanged=!1;for(let L=0;L<$;L++)if(L<this._colors.length){const oe=this._colors[L],mt=this._cachedColorRgb[L]||[0,0,0];a.uniform1f(p.uniforms[`u_colors[${L}].is_active`],oe.enabled?1:0),a.uniform3fv(p.uniforms[`u_colors[${L}].color`],mt),a.uniform1f(p.uniforms[`u_colors[${L}].influence`],oe.influence||0)}else a.uniform1f(p.uniforms[`u_colors[${L}].is_active`],0);a.uniform1i(p.uniforms.u_colors_count,$)}}a.clearColor(this._backgroundColorRgb[0],this._backgroundColorRgb[1],this._backgroundColorRgb[2],this._backgroundAlpha),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),this._wireframe?(a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.glState.buffers.wireframeIndex),a.drawElements(a.LINES,this.glState.wireframeIndexCount,q,0),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.glState.buffers.index)):a.drawElements(a.TRIANGLES,X,q,0),this._licensed||this._renderWatermark(a),this._isVisible&&(this.requestRef=requestAnimationFrame(H))};this._visibilityObserver=new IntersectionObserver(a=>{const O=this._isVisible;this._isVisible=a[0].isIntersecting&&document.visibilityState!=="hidden",this._isVisible&&!O&&(Z=performance.now(),this.requestRef=requestAnimationFrame(H))},{threshold:0}),this._visibilityObserver.observe(o),this._visibilityHandler=()=>{const a=this._isVisible;document.visibilityState==="hidden"?this._isVisible=!1:(this._isVisible=!0,a||(Z=performance.now(),this.requestRef=requestAnimationFrame(H)))},document.addEventListener("visibilitychange",this._visibilityHandler);const ht=(a,O)=>{if(this._ref.width===a&&this._ref.height===O)return;const{gl:p,camera:X}=this.glState;this._ref.width=a,this._ref.height=O,p.viewport(0,0,a,O),j(X,a,O,V,N,this._shapeType,this._cameraZoom);const q=this.glState.locations.uniforms.projectionMatrix;p.useProgram(this.glState.program),q&&p.uniformMatrix4fv(q,!1,X.projectionMatrix.elements),this._uniformsDirty=!0,H()};this.sizeObserver=new ResizeObserver(a=>{const O=a[a.length-1],p=Math.round(O.contentRect.width),X=Math.round(O.contentRect.height);this._resizeTimeoutId!==null&&clearTimeout(this._resizeTimeoutId),this._resizeTimeoutId=window.setTimeout(()=>{ht(p,X),this._resizeTimeoutId=null,this._wmCachedRect=null},100)}),this.sizeObserver.observe(o),H()}destroy(){if(cancelAnimationFrame(this.requestRef),this.sizeObserver.disconnect(),this._visibilityObserver&&(this._visibilityObserver.disconnect(),this._visibilityObserver=null),this._visibilityHandler&&(document.removeEventListener("visibilitychange",this._visibilityHandler),this._visibilityHandler=null),this._resizeTimeoutId!==null&&(clearTimeout(this._resizeTimeoutId),this._resizeTimeoutId=null),this._wmClickHandler&&(document.removeEventListener("click",this._wmClickHandler,!0),this._wmClickHandler=null),this._wmMoveHandler&&(document.removeEventListener("mousemove",this._wmMoveHandler),this._wmMoveHandler=null),this.glState){const e=this.glState.gl;e.deleteProgram(this.glState.program),e.deleteBuffer(this.glState.buffers.position),e.deleteBuffer(this.glState.buffers.normal),e.deleteBuffer(this.glState.buffers.uv),e.deleteBuffer(this.glState.buffers.index),e.deleteBuffer(this.glState.buffers.wireframeIndex),this._watermarkProgram&&e.deleteProgram(this._watermarkProgram),this._watermarkTexture&&e.deleteTexture(this._watermarkTexture),this._watermarkBuffer&&e.deleteBuffer(this._watermarkBuffer),this._watermarkTexCoordBuffer&&e.deleteBuffer(this._watermarkTexCoordBuffer);const o=e;o.deleteVertexArray&&(this._gradientVAO&&o.deleteVertexArray(this._gradientVAO),this._watermarkVAO&&o.deleteVertexArray(this._watermarkVAO))}this._proceduralTexture&&this.glState&&this.glState.gl.deleteTexture(this._proceduralTexture)}get colors(){return this._colors}set colors(e){this._uniformsDirty=!0,this._colors=e,this._cachedColorRgb=e.map(o=>this._hexToRgb(o.color)),this._colorsChanged=!0}get grainScale(){return this._grainScale}set grainScale(e){this._uniformsDirty=!0,this._grainScale=e==0?1:e}get resolution(){return this._resolution}set resolution(e){this._resolution!==e&&(this._resolution=e,this._updateGeometry())}get antialias(){return this._antialias}set antialias(e){this._antialias!==e&&(this._antialias=e,console.warn("NeatGradient: Changing 'antialias' at runtime is not supported because the WebGL context is already created. Recreate the NeatGradient instance to apply this change."))}get backgroundColor(){return this._backgroundColor}set backgroundColor(e){this._uniformsDirty=!0,this._backgroundColor=e,this._backgroundColorRgb=this._hexToRgb(e)}get yOffset(){return this._yOffset}set yOffset(e){this._yOffset!==e&&(this._yOffsetDirty=!0,this._yOffset=e)}get enableProceduralTexture(){return this._enableProceduralTexture}set enableProceduralTexture(e){this._uniformsDirty=!0,this._enableProceduralTexture=e,e&&!this._proceduralTexture&&(this._textureNeedsUpdate=!0)}_updateGeometry(){if(!this.glState)return;const e=this.glState.gl,o=this._resolution||1;let r;this._shapeType==="sphere"?r=le(this._sphereRadius,120*o,120*o):this._shapeType==="torus"?r=_e(this._torusRadius,this._torusTube,120*o,120*o):this._shapeType==="cylinder"?r=ue(this._cylinderRadius,this._cylinderRadius,this._cylinderHeight,120*o,120*o):this._shapeType==="ribbon"?r=fe(V,N,240*o,240*o,this._planeBend,this._planeTwist):r=ne(V,N,240*o,240*o);const{position:_,normal:t,uv:s,index:u,wireframeIndex:n}=r;e.bindBuffer(e.ARRAY_BUFFER,this.glState.buffers.position),e.bufferData(e.ARRAY_BUFFER,_,e.STATIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,this.glState.buffers.normal),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,this.glState.buffers.uv),e.bufferData(e.ARRAY_BUFFER,s,e.STATIC_DRAW),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.glState.buffers.index),e.bufferData(e.ELEMENT_ARRAY_BUFFER,u,e.STATIC_DRAW),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.glState.buffers.wireframeIndex),e.bufferData(e.ELEMENT_ARRAY_BUFFER,n,e.STATIC_DRAW),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.glState.buffers.index),this.glState.indexCount=u.length,this.glState.wireframeIndexCount=n.length,this.glState.indexType=u instanceof Uint32Array?e.UNSIGNED_INT:e.UNSIGNED_SHORT;const g=this._ref.width,x=this._ref.height;j(this.glState.camera,g,x,V,N,this._shapeType,this._cameraZoom);const m=this.glState.locations.uniforms.projectionMatrix;e.useProgram(this.glState.program),m&&e.uniformMatrix4fv(m,!1,this.glState.camera.projectionMatrix.elements),this._uniformsDirty=!0}_hexToRgb(e){const o=parseInt(e.replace("#",""),16);return[(o>>16&255)/255,(o>>8&255)/255,(o&255)/255]}_initScene(e,o=!1){let r=this._ref.width,_=this._ref.height;(r===0||_===0||r===300&&_===150)&&(r=this._ref.clientWidth||300,_=this._ref.clientHeight||150,this._ref.width=r,this._ref.height=_);const t=this._ref.getContext("webgl2",{alpha:!0,preserveDrawingBuffer:o,antialias:this._antialias})||this._ref.getContext("webgl",{alpha:!0,preserveDrawingBuffer:o,antialias:this._antialias});if(!t)throw new Error("WebGL not supported");t.getExtension("OES_standard_derivatives"),t.getExtension("OES_element_index_uint"),t.viewport(0,0,r,_);let s;this._shapeType==="sphere"?s=le(this._sphereRadius,120*e,120*e):this._shapeType==="torus"?s=_e(this._torusRadius,this._torusTube,120*e,120*e):this._shapeType==="cylinder"?s=ue(this._cylinderRadius,this._cylinderRadius,this._cylinderHeight,120*e,120*e):this._shapeType==="ribbon"?s=fe(V,N,240*e,240*e,this._planeBend,this._planeTwist):s=ne(V,N,240*e,240*e);const{position:u,normal:n,uv:g,index:x,wireframeIndex:m}=s,h=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,h),t.bufferData(t.ARRAY_BUFFER,u,t.STATIC_DRAW);const R=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,R),t.bufferData(t.ARRAY_BUFFER,n,t.STATIC_DRAW);const l=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,l),t.bufferData(t.ARRAY_BUFFER,g,t.STATIC_DRAW);const v=t.createBuffer();t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,v),t.bufferData(t.ELEMENT_ARRAY_BUFFER,x,t.STATIC_DRAW);const A=t.createBuffer();t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,A),t.bufferData(t.ELEMENT_ARRAY_BUFFER,m,t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,v);const y=xt()+`
`+se()+`
`+ae()+`
`+vt,b=t.createShader(t.VERTEX_SHADER);t.shaderSource(b,y),t.compileShader(b),t.getShaderParameter(b,t.COMPILE_STATUS)||(console.log("VERTEX_SHADER_ERROR_START"),console.log("Vertex shader error: ",t.getShaderInfoLog(b)),console.log("GL Error Code:",t.getError()),console.log("Vertex Shader Source Dump:"),console.log(y.split(`
`).map((S,I)=>`${I+1}: ${S}`).join(`
`)),console.log("VERTEX_SHADER_ERROR_END"));const T=wt()+`
`+ae()+`
`+se()+`
`+yt,w=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(w,T),t.compileShader(w),t.getShaderParameter(w,t.COMPILE_STATUS)||(console.log("FRAGMENT_SHADER_ERROR_START"),console.log("Fragment shader error: ",t.getShaderInfoLog(w)),console.log("GL Error Code:",t.getError()),console.log("Fragment Shader Source Dump:"),console.log(T.split(`
`).map((S,I)=>`${I+1}: ${S}`).join(`
`)),console.log("FRAGMENT_SHADER_ERROR_END"));const d=t.createProgram();t.attachShader(d,b),t.attachShader(d,w),t.linkProgram(d),t.getProgramParameter(d,t.LINK_STATUS)||(console.log("PROGRAM_LINK_ERROR_START"),console.log("Program linking error: ",t.getProgramInfoLog(d)),console.log("GL Error Code:",t.getError()),console.log("PROGRAM_LINK_ERROR_END")),t.useProgram(d);const F=new bt(0,0,0,0,0,1e3);F.position=[0,0,5],j(F,r,_,V,N,this._shapeType,this._cameraZoom);const c=t.getAttribLocation(d,"position"),E=t.getAttribLocation(d,"normal"),C=t.getAttribLocation(d,"uv");t.enableVertexAttribArray(c),t.bindBuffer(t.ARRAY_BUFFER,h),t.vertexAttribPointer(c,3,t.FLOAT,!1,0,0),t.enableVertexAttribArray(E),t.bindBuffer(t.ARRAY_BUFFER,R),t.vertexAttribPointer(E,3,t.FLOAT,!1,0,0),t.enableVertexAttribArray(C),t.bindBuffer(t.ARRAY_BUFFER,l),t.vertexAttribPointer(C,2,t.FLOAT,!1,0,0),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,v);const M=t.getUniformLocation(d,"projectionMatrix");t.uniformMatrix4fv(M,!1,F.projectionMatrix.elements);const P=t.getUniformLocation(d,"u_plane_width");t.uniform1f(P,V);const B=t.getUniformLocation(d,"u_plane_height");t.uniform1f(B,N);const U=t.getUniformLocation(d,"u_colors_count");t.uniform1i(U,$);const D=["projectionMatrix","modelViewMatrix","u_time","u_resolution","u_color_pressure","u_wave_frequency_x","u_wave_frequency_y","u_wave_amplitude","u_colors_count","u_plane_width","u_plane_height","u_shadows","u_highlights","u_grain_intensity","u_grain_sparsity","u_grain_scale","u_grain_speed","u_flow_distortion_a","u_flow_distortion_b","u_flow_scale","u_flow_ease","u_flow_enabled","u_y_offset","u_y_offset_wave_multiplier","u_y_offset_color_multiplier","u_y_offset_flow_multiplier","u_procedural_texture","u_enable_procedural_texture","u_texture_ease","u_transparent_texture_void","u_saturation","u_brightness","u_color_blending","u_domain_warp_enabled","u_domain_warp_intensity","u_domain_warp_scale","u_vignette_intensity","u_vignette_radius","u_fresnel_enabled","u_fresnel_power","u_fresnel_intensity","u_fresnel_color","u_iridescence_enabled","u_iridescence_intensity","u_iridescence_speed","u_bloom_intensity","u_bloom_threshold","u_chromatic_aberration","u_shape_type","u_silhouette_fade","u_cylinder_fade","u_ribbon_fade","u_flat_shading"],z={attributes:{position:c,normal:E,uv:C},uniforms:{}};D.forEach(S=>{z.uniforms[S]=t.getUniformLocation(d,S)});for(let S=0;S<$;S++)z.uniforms[`u_colors[${S}].is_active`]=t.getUniformLocation(d,`u_colors[${S}].is_active`),z.uniforms[`u_colors[${S}].color`]=t.getUniformLocation(d,`u_colors[${S}].color`),z.uniforms[`u_colors[${S}].influence`]=t.getUniformLocation(d,`u_colors[${S}].influence`);return this._initialized=!0,this._uniformsDirty=!0,this._colorsChanged=!0,this._textureDirty=!0,t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),t.enable(t.DEPTH_TEST),{gl:t,program:d,buffers:{position:h,normal:R,uv:l,index:v,wireframeIndex:A},locations:z,camera:F,indexCount:x.length,wireframeIndexCount:m.length,indexType:x instanceof Uint32Array?t.UNSIGNED_INT:t.UNSIGNED_SHORT}}_createProceduralTexture(e){this._sourceCanvas||(this._sourceCanvas=document.createElement("canvas"),this._sourceCanvas.width=1024,this._sourceCanvas.height=1024,this._sourceCtx=this._sourceCanvas.getContext("2d"));const o=this._sourceCanvas,r=this._sourceCtx;if(!r)return null;let _=this._textureSeed;const t=this._textureSeed;function s(){const c=Math.sin(_++)*1e4;return c-Math.floor(c)}const u=c=>{_=t+c},n=this._colors.filter(c=>c.enabled).map(c=>c.color);if(n.length===0)return null;const g=this._shapeType!=="plane",x=g?[-1,0,1]:[0],m=g?[-1,0,1]:[0];function h(c){const E=parseInt(c.replace("#",""),16);return{r:E>>16&255,g:E>>8&255,b:E&255}}function R(c,E,C){return"#"+((1<<24)+(Math.round(c)<<16)+(Math.round(E)<<8)+Math.round(C)).toString(16).slice(1).padStart(6,"0")}const l=()=>{const c=n[Math.floor(s()*n.length)],E=n[Math.floor(s()*n.length)],C=s()*this._textureColorBlending,M=h(c),P=h(E),B=M.r+(P.r-M.r)*C,U=M.g+(P.g-M.g)*C,D=M.b+(P.b-M.b)*C;return R(B,U,D)},v=this._proceduralBackgroundColor||"#000000";r.fillStyle=v,r.fillRect(0,0,1024,1024);const A=r.createLinearGradient(0,0,0,1024);A.addColorStop(0,l()),A.addColorStop(1,l()),r.fillStyle=A,r.fillRect(0,0,1024,1024);for(let c=0;c<this._textureShapeTriangles;c++){const E=l(),C=s()*1024,M=s()*1024,P=100+s()*300,B=(s()-.5)*P,U=(s()-.5)*P,D=(s()-.5)*P,z=(s()-.5)*P;for(const S of x)for(const I of m){r.fillStyle=E,r.beginPath();const k=C+S*1024,W=M+I*1024;r.moveTo(k,W),r.lineTo(k+B,W+U),r.lineTo(k+D,W+z),r.fill()}}for(let c=0;c<this._textureShapeCircles;c++){const E=l(),C=10+s()*50,M=s()*1024,P=s()*1024,B=50+s()*150;for(const U of x)for(const D of m)r.strokeStyle=E,r.lineWidth=C,r.beginPath(),r.arc(M+U*1024,P+D*1024,B,0,Math.PI*2),r.stroke()}for(let c=0;c<this._textureShapeBars;c++){const E=l(),C=s()*1024,M=s()*1024,P=s()*Math.PI;for(const B of x)for(const U of m)r.fillStyle=E,r.save(),r.translate(C+B*1024,M+U*1024),r.rotate(P),r.fillRect(-150,-25,300,50),r.restore()}r.lineWidth=15,r.lineCap="round";for(let c=0;c<this._textureShapeSquiggles;c++){const E=l(),C=s()*1024,M=s()*1024,P=[];let B=0,U=0;for(let D=0;D<4;D++){const z=B+(s()-.5)*300,S=U+(s()-.5)*300;P.push({cx1:B+(s()-.5)*300,cy1:U+(s()-.5)*300,cx2:B+(s()-.5)*300,cy2:U+(s()-.5)*300,ex:z,ey:S}),B=z,U=S}for(const D of x)for(const z of m){r.strokeStyle=E,r.beginPath();const S=C+D*1024,I=M+z*1024;r.moveTo(S,I);for(const k of P)r.bezierCurveTo(S+k.cx1,I+k.cy1,S+k.cx2,I+k.cy2,S+k.ex,I+k.ey);r.stroke()}}u(5e4),this._maskedCanvas||(this._maskedCanvas=document.createElement("canvas"),this._maskedCanvas.width=1024,this._maskedCanvas.height=1024,this._maskedCtx=this._maskedCanvas.getContext("2d"));const y=this._maskedCanvas,b=this._maskedCtx;if(!b)return null;this._transparentTextureVoid?b.clearRect(0,0,1024,1024):(b.fillStyle=v,b.fillRect(0,0,1024,1024));let T=0;const w=[];for(;T<1024;)if(s()<this._textureVoidLikelihood){const c=this._textureVoidWidthMin+s()*(this._textureVoidWidthMax-this._textureVoidWidthMin);w.push({type:"void",x:T,width:c}),T+=c}else{const c=50+s()*200;w.push({type:"matter",x:T,width:c}),T+=c}for(const c of w)if(c.type==="matter"){const E=c.x,C=Math.min(c.x+c.width,1024);let M=E;for(;M<C;){const P=(2+s()*20)/this._textureBandDensity,B=Math.floor(s()*1024);b.drawImage(o,B,0,P,1024,M,0,P,1024),M+=P}}const d=e.createTexture();e.bindTexture(e.TEXTURE_2D,d),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,y),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.generateMipmap(e.TEXTURE_2D);const F=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");if(F){const c=e.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT);e.texParameterf(e.TEXTURE_2D,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(16,c))}return d}get fresnelColor(){return this._fresnelColor}set fresnelColor(e){this._fresnelColor!==e&&(this._fresnelColor=e,this._fresnelColorRgb=this._hexToRgb(e),this._uniformsDirty=!0)}get shapeType(){return this._shapeType}set shapeType(e){this._shapeType!==e&&(this._shapeType=e,this._updateGeometry())}get cameraLock(){return this._cameraLock}set cameraLock(e){this._cameraLock=e}get cameraZoom(){return this._cameraZoom}set cameraZoom(e){this._cameraZoom!==e&&(this._cameraZoom=e,this._updateCameraFrustum())}_updateCameraFrustum(){if(!this.glState)return;const e=this.glState.gl,o=this._ref.width,r=this._ref.height;j(this.glState.camera,o,r,V,N,this._shapeType,this._cameraZoom);const _=this.glState.locations.uniforms.projectionMatrix;e.useProgram(this.glState.program),_&&e.uniformMatrix4fv(_,!1,this.glState.camera.projectionMatrix.elements),this._uniformsDirty=!0}_initWatermark(){const e=this.glState.gl,o=e,r=typeof o.createVertexArray=="function",_=e.createShader(e.VERTEX_SHADER);e.shaderSource(_,Ct),e.compileShader(_);const t=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(t,Ut),e.compileShader(t);const s=e.createProgram();e.attachShader(s,_),e.attachShader(s,t),e.linkProgram(s),this._watermarkProgram=s,e.deleteShader(_),e.deleteShader(t);const u=13,n=6,g=5,x=document.createElement("canvas").getContext("2d");x.font=`bold ${u}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;const m=x.measureText("NEAT"),h=Math.ceil(m.width),R=u,l=h+n*2,v=R+g*2;this._watermarkWidth=l,this._watermarkHeight=v;const A=document.createElement("canvas");A.width=l,A.height=v;const y=A.getContext("2d");y.clearRect(0,0,l,v),y.shadowColor="rgba(0,0,0,0.4)",y.shadowBlur=2,y.shadowOffsetX=1,y.shadowOffsetY=1,y.font=`bold ${u}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,y.textAlign="center",y.textBaseline="middle",y.fillStyle="rgba(255,255,255,0.5)",y.fillText("NEAT",l/2,v/2);const b=e.createTexture();e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,b),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,A),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),this._watermarkTexture=b;const T=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,T),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,1,1,1,0,0,1,0]),e.STATIC_DRAW),this._watermarkTexCoordBuffer=T;const w=e.createBuffer();if(e.bindBuffer(e.ARRAY_BUFFER,w),e.bufferData(e.ARRAY_BUFFER,new Float32Array(8),e.DYNAMIC_DRAW),this._watermarkBuffer=w,this._wmLocPos=e.getAttribLocation(s,"a_wm_position"),this._wmLocTc=e.getAttribLocation(s,"a_wm_texcoord"),this._wmLocTex=e.getUniformLocation(s,"u_wm_texture"),r){this._watermarkVAO=o.createVertexArray(),o.bindVertexArray(this._watermarkVAO),e.enableVertexAttribArray(this._wmLocPos),e.bindBuffer(e.ARRAY_BUFFER,w),e.vertexAttribPointer(this._wmLocPos,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(this._wmLocTc),e.bindBuffer(e.ARRAY_BUFFER,T),e.vertexAttribPointer(this._wmLocTc,2,e.FLOAT,!1,0,0),this._gradientVAO=o.createVertexArray(),o.bindVertexArray(this._gradientVAO);const d=this.glState.locations.attributes;e.enableVertexAttribArray(d.position),e.bindBuffer(e.ARRAY_BUFFER,this.glState.buffers.position),e.vertexAttribPointer(d.position,3,e.FLOAT,!1,0,0),e.enableVertexAttribArray(d.normal),e.bindBuffer(e.ARRAY_BUFFER,this.glState.buffers.normal),e.vertexAttribPointer(d.normal,3,e.FLOAT,!1,0,0),e.enableVertexAttribArray(d.uv),e.bindBuffer(e.ARRAY_BUFFER,this.glState.buffers.uv),e.vertexAttribPointer(d.uv,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.glState.buffers.index),o.bindVertexArray(this._gradientVAO)}this._wmClickHandler=d=>{this._licensed||this._isOverWatermark(d)&&(d.preventDefault(),d.stopPropagation(),window.open("https://neat.firecms.co","_blank","noopener"))},this._wmMoveHandler=d=>{if(this._licensed){this._currentCursor!==""&&(this._currentCursor="",this._ref.style.cursor="",document.body.style.cursor="");return}this._wmMoveRafPending||(this._wmMoveRafPending=!0,requestAnimationFrame(()=>{this._wmMoveRafPending=!1;const F=performance.now();(!this._wmCachedRect||F-this._wmRectCacheTime>500)&&(this._wmCachedRect=this._ref.getBoundingClientRect(),this._wmRectCacheTime=F);const c=this._wmCachedRect,E=d.clientX-c.left,C=d.clientY-c.top,M=c.width,P=c.height;let B="";if(E>=0&&C>=0&&E<=M&&C<=P){const U=this._watermarkMargin,D=this._watermarkWidth,z=this._watermarkHeight,S=M-U-D,I=P-U-z;E>=S&&E<=M-U&&C>=I&&C<=P-U&&(B="pointer")}this._currentCursor!==B&&(this._currentCursor=B,this._ref.style.cursor=B,document.body.style.cursor=B)}))},document.addEventListener("click",this._wmClickHandler,!0),document.addEventListener("mousemove",this._wmMoveHandler)}_isOverWatermark(e){this._wmCachedRect||(this._wmCachedRect=this._ref.getBoundingClientRect(),this._wmRectCacheTime=performance.now());const o=this._wmCachedRect,r=e.clientX-o.left,_=e.clientY-o.top,t=o.width,s=o.height;if(r<0||_<0||r>t||_>s)return!1;const u=this._watermarkMargin,n=this._watermarkWidth,g=this._watermarkHeight,x=t-u-n,m=s-u-g;return r>=x&&r<=t-u&&_>=m&&_<=s-u}_renderWatermark(e){const o=this._watermarkProgram,r=this._watermarkTexture,_=this._watermarkBuffer;if(!o||!r||!_)return;const t=this._ref.width,s=this._ref.height;if(t===0||s===0)return;const u=4,n=this._watermarkWidth,g=this._watermarkHeight,x=1-u/t*2,m=x-n/t*2,h=-1+u/s*2,R=h+g/s*2,l=this._wmPosData;l[0]=m,l[1]=h,l[2]=x,l[3]=h,l[4]=m,l[5]=R,l[6]=x,l[7]=R,e.bindBuffer(e.ARRAY_BUFFER,_),e.bufferSubData(e.ARRAY_BUFFER,0,l);const v=e,A=this._watermarkVAO!==null;if(e.useProgram(o),e.disable(e.DEPTH_TEST),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),A?(v.bindVertexArray(this._watermarkVAO),e.bindBuffer(e.ARRAY_BUFFER,_),e.vertexAttribPointer(this._wmLocPos,2,e.FLOAT,!1,0,0)):(e.enableVertexAttribArray(this._wmLocPos),e.bindBuffer(e.ARRAY_BUFFER,_),e.vertexAttribPointer(this._wmLocPos,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(this._wmLocTc),e.bindBuffer(e.ARRAY_BUFFER,this._watermarkTexCoordBuffer),e.vertexAttribPointer(this._wmLocTc,2,e.FLOAT,!1,0,0)),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,r),e.uniform1i(this._wmLocTex,2),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.enable(e.DEPTH_TEST),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.useProgram(this.glState.program),A)v.bindVertexArray(this._gradientVAO);else{const y=this.glState.locations.attributes;e.enableVertexAttribArray(y.position),e.bindBuffer(e.ARRAY_BUFFER,this.glState.buffers.position),e.vertexAttribPointer(y.position,3,e.FLOAT,!1,0,0),e.enableVertexAttribArray(y.normal),e.bindBuffer(e.ARRAY_BUFFER,this.glState.buffers.normal),e.vertexAttribPointer(y.normal,3,e.FLOAT,!1,0,0),e.enableVertexAttribArray(y.uv),e.bindBuffer(e.ARRAY_BUFFER,this.glState.buffers.uv),e.vertexAttribPointer(y.uv,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.glState.buffers.index)}}}for(const[f,e,o,r,_]of St)Object.defineProperty(Ft.prototype,f,{get(){return o===1?this[e]:this[e]*o},set(t){const s=r===1?t:t*r;this[e]!==s&&(this[e]=s,this._uniformsDirty=!0,_==="t"&&this._enableProceduralTexture?this._textureNeedsUpdate=!0:_==="g"&&this._updateGeometry())},enumerable:!0,configurable:!0});function Pt(){const f=new Date,e=f.getMinutes(),o=f.getSeconds();return e*60+o}function Mt(){if(document.querySelector('meta[name="generator"][content*="NEAT"]'))return;const f=document.createElement("meta");f.name="generator",f.content="NEAT by FireCMS — https://neat.firecms.co",document.head.appendChild(f)}const Ct=`
attribute vec2 a_wm_position;
attribute vec2 a_wm_texcoord;
varying vec2 v_wm_texcoord;
void main() {
    gl_Position = vec4(a_wm_position, 0.0, 1.0);
    v_wm_texcoord = a_wm_texcoord;
}
`,Ut=`
precision mediump float;
varying vec2 v_wm_texcoord;
uniform sampler2D u_wm_texture;
void main() {
    gl_FragColor = texture2D(u_wm_texture, v_wm_texcoord);
}
`;export{Ft as NeatGradient};
