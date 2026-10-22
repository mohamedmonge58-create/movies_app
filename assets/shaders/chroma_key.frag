#version 460 core
#include <flutter/runtime_effect.glsl>

uniform vec2 uSize;
uniform sampler2D uTexture;

out vec4 fragColor;

void main() {
  vec2 uv = FlutterFragCoord().xy / uSize;
  vec4 color = texture(uTexture, uv);
  float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  float threshold = 0.15;   // زوّد الرقم لو لسه في حواف غامقة ظاهرة
  float smoothness = 0.08;  // نعومة الحواف بين الشفاف والظاهر
  float alpha = smoothstep(threshold, threshold + smoothness, luminance);
  fragColor = vec4(color.rgb, color.a * alpha);
}